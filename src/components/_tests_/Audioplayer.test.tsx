import React from 'react';
import { shallow } from 'enzyme';
import sampleSize from 'lodash/sampleSize';
import Audioplayer, { DIRECTIONS } from '../Audioplayer';

import { chapter } from '../../../tests/fixtures/chapters';
import verse, { getVerse } from '../../../tests/fixtures/verse';

let getProps: $TsFixMe;
let fileMock: $TsFixMe;

describe('<Audioplayer', () => {
  beforeEach(() => {
    const getFileMock = () => ({
      play: jest.fn(),
      pause: jest.fn(),
      setAttribute: jest.fn(),
      src: sampleSize('abcdefg', 3).join(''),
      duration: 1000,
    });

    getProps = (overrides = {}) => ({
      chapter,
      play: jest.fn(),
      pause: jest.fn(),
      setCurrentVerseKey: jest.fn(),
      update: jest.fn(),
      setRepeat: jest.fn(),
      fetchAudio: jest.fn(() => Promise.resolve({})),
      shouldScroll: false,
      toggleScroll: jest.fn(),
      isPlaying: false,
      audioSetting: 7,
      repeat: {},
      files: {
        '1:1': getFileMock(),
        '1:2': getFileMock(),
      },
      verses: {
        '1:1': verse,
        '1:2': getVerse(1, 2),
        '1:3': getVerse(1, 3),
      },
      ...overrides,
    });

    fileMock = getFileMock();
  });

  it('renders valid', () => {
    expect(React.isValidElement(<Audioplayer {...getProps()} />)).toBeTruthy();
  });

  describe('#componentDidMount', () => {
    it('fetches audio', () => {
      const props = getProps({ currentVerseKey: '1:1' });
      const { fetchAudio } = props;
      shallow(<Audioplayer {...props} />);

      expect(fetchAudio).toBeCalled();
      expect(fetchAudio).toBeCalledWith({
        audio: 7,
        chapterId: 1,
        isCurrentVerse: false,
        verseId: 1,
        verseKey: '1:1',
      });
    });

    it('fetches audio with isCurrentVerse when no currentVerseKey is present', () => {
      const props = getProps();
      const { fetchAudio } = props;
      shallow(<Audioplayer {...props} />);

      expect(fetchAudio).toBeCalled();
      expect(fetchAudio).toBeCalledWith({
        audio: 7,
        chapterId: 1,
        isCurrentVerse: true,
        verseId: 1,
        verseKey: '1:1',
      });
    });
  });
  describe('#componentDidUpdate', () => {
    it('calls currentFile.play when isPlaying changes to true', () => {
      const props = getProps({ currentFile: fileMock });
      const wrapper = shallow(<Audioplayer {...props} />);

      wrapper.setProps({ isPlaying: true });

      expect(fileMock.play).toHaveBeenCalled();
    });

    it('calls currentFile.pause when isPlaying changes to false', () => {
      const props = getProps({ currentFile: fileMock, isPlaying: true });
      const wrapper = shallow(<Audioplayer {...props} />);

      wrapper.setProps({ isPlaying: false });

      expect(fileMock.pause).toHaveBeenCalled();
    });

    it('calls fetchNextAudioFile for next verse when currentFile is set', () => {
      const props = getProps({ currentVerseKey: '1:1' });
      const wrapper = shallow(<Audioplayer {...props} />);
      const { fetchAudio } = props;

      wrapper.setProps({ currentFile: fileMock });

      expect(fetchAudio).toHaveBeenCalledTimes(2);
      expect(fetchAudio).toHaveBeenLastCalledWith({
        audio: 7,
        chapterId: 1,
        verseId: 2,
        verseKey: '1:2',
      });
    });

    it('calls sets attribute preload on currentFile', () => {
      const props = getProps({ currentVerseKey: '1:1' });
      const wrapper = shallow(<Audioplayer {...props} />);

      wrapper.setProps({ currentFile: fileMock });

      expect(fileMock.setAttribute).toHaveBeenCalled();
    });

    it('assigns listeneres to currentFile', () => {
      const props = getProps({ currentVerseKey: '1:1' });
      const wrapper = shallow(<Audioplayer {...props} />);

      wrapper.setProps({ currentFile: fileMock });

      expect(fileMock.onloadeddata).toBeDefined();
      expect(fileMock.onpause).toBeDefined();
      expect(fileMock.onplay).toBeDefined();
      expect(fileMock.onended).toBeDefined();
    });

    it('fetches next audio when currentFile changes', () => {
      const props = getProps({ currentVerseKey: '1:1', currentFile: fileMock });
      const wrapper = shallow(<Audioplayer {...props} />);
      const { files, fetchAudio } = props;

      wrapper.setProps({ currentVerseKey: '1:2', currentFile: files['1:2'] });

      expect(fetchAudio).toHaveBeenLastCalledWith({
        audio: 7,
        chapterId: 1,
        verseId: 3,
        verseKey: '1:3',
      });

      expect(fileMock.onloadeddata).toBeNull();
      expect(fileMock.ontimeupdate).toBeNull();
      expect(fileMock.onpause).toBeNull();
      expect(fileMock.onplay).toBeNull();
      expect(fileMock.onended).toBeNull();
      expect(fileMock.onprogress).toBeNull();
      expect(files['1:2'].onloadeddata).toBeDefined();
      expect(files['1:2'].onpause).toBeDefined();
      expect(files['1:2'].onplay).toBeDefined();
      expect(files['1:2'].onended).toBeDefined();
    });

    it('fetches audio file when currentFile is not present', () => {
      const props = getProps({ currentVerseKey: '1:1', currentFile: fileMock });
      const wrapper = shallow(<Audioplayer {...props} />);
      const { fetchAudio } = props;

      wrapper.setProps({ currentVerseKey: '1:3' });

      expect(fetchAudio).toHaveBeenLastCalledWith({
        audio: 7,
        chapterId: 1,
        verseId: 3,
        verseKey: '1:3',
      });
    });
  });

  describe('componentWillUnount', () => {
    it('removes all listeners when currentFile present', () => {
      const props = getProps({ currentVerseKey: '1:1' });
      const wrapper = shallow(<Audioplayer {...props} />);

      wrapper.setProps({ currentFile: fileMock });
      wrapper.unmount();

      expect(fileMock.pause).toHaveBeenCalled();
      expect(fileMock.currentTime).toEqual(0);
      expect(fileMock.onloadeddata).toBeNull();
      expect(fileMock.ontimeupdate).toBeNull();
      expect(fileMock.onpause).toBeNull();
      expect(fileMock.onplay).toBeNull();
      expect(fileMock.onended).toBeNull();
      expect(fileMock.onprogress).toBeNull();
    });
  });

  describe('currentFile listeners', () => {
    it('calls update on currentFile loaded', () => {
      const props = getProps({ currentVerseKey: '1:1', currentFile: fileMock });
      const wrapper = shallow(<Audioplayer {...props} />);
      const { update } = props;
      const instance = wrapper.instance() as Audioplayer;

      instance.addFileListeners(fileMock);

      fileMock.onloadeddata();

      expect(update).toHaveBeenCalled();
      expect(update).toHaveBeenCalledWith({
        duration: fileMock.duration,
        currentTime: 0,
        isLoading: false,
      });
    });

    it('sets ontimeupdate listener when onplay triggered', () => {
      const props = getProps({ currentVerseKey: '1:1', currentFile: fileMock });
      const wrapper = shallow(<Audioplayer {...props} />);
      const instance = wrapper.instance() as Audioplayer;

      instance.addFileListeners(fileMock);

      expect(fileMock.ontimeupdate).toBeUndefined();

      fileMock.onplay();

      expect(fileMock.ontimeupdate).toBeDefined();
    });

    it('removes ontimeupdate listener when onpause triggered', () => {
      const props = getProps({ currentVerseKey: '1:1', currentFile: fileMock });
      const wrapper = shallow(<Audioplayer {...props} />);
      const instance = wrapper.instance() as Audioplayer;

      instance.addFileListeners(fileMock);

      fileMock.ontimeupdate = () => {};

      expect(fileMock.ontimeupdate).toBeDefined();

      fileMock.onpause();

      expect(fileMock.ontimeupdate).toBeNull();
    });

    it('preloads next file when current file is almost over', () => {
      const props = getProps({ currentVerseKey: '1:1', currentFile: fileMock });
      const wrapper = shallow(<Audioplayer {...props} />);
      const { files } = props;
      const instance = wrapper.instance() as Audioplayer;
      const nextFile = files['1:2'];

      instance.addFileListeners(fileMock);

      fileMock.currentTime = fileMock.duration;

      fileMock.onplay();
      fileMock.ontimeupdate();

      expect(nextFile.setAttribute).toHaveBeenCalled();
    });

    it('calls update when time is updated on file', () => {
      const props = getProps({ currentVerseKey: '1:1', currentFile: fileMock });
      const wrapper = shallow(<Audioplayer {...props} />);
      const { update } = props;
      const instance = wrapper.instance() as Audioplayer;

      instance.addFileListeners(fileMock);

      fileMock.onplay();
      fileMock.ontimeupdate();

      expect(update).toHaveBeenCalled();
    });

    it('calls setCurrentVerseKey when file has ended', () => {
      const props = getProps({ currentVerseKey: '1:1', currentFile: fileMock });
      const wrapper = shallow(<Audioplayer {...props} />);
      const { setCurrentVerseKey } = props;
      const instance = wrapper.instance() as Audioplayer;

      instance.addFileListeners(fileMock);
      fileMock.readyState = 3;
      fileMock.onended();

      expect(setCurrentVerseKey).toHaveBeenCalled();
      expect(setCurrentVerseKey).toHaveBeenCalledWith('1:2', true);
    });
  });

  describe('handling next verse', () => {
    it('sets the next verse', () => {
      const props = getProps({ currentVerseKey: '1:1', currentFile: fileMock });
      const wrapper = shallow(<Audioplayer {...props} />);
      const { setCurrentVerseKey } = props;
      const instance = wrapper.instance() as Audioplayer;

      instance.handleVerseChange(DIRECTIONS.NEXT);

      expect(setCurrentVerseKey).toHaveBeenCalled();
      expect(setCurrentVerseKey).toHaveBeenCalledWith('1:2', true);
    });
  });

  describe('handling previous verse', () => {
    it('does not set the previous verse when first verse', () => {
      const props = getProps({ currentVerseKey: '1:1', currentFile: fileMock });
      const wrapper = shallow(<Audioplayer {...props} />);
      const { setCurrentVerseKey } = props;
      const instance = wrapper.instance() as Audioplayer;

      instance.handleVerseChange(DIRECTIONS.PREVIOUS);

      expect(setCurrentVerseKey).not.toHaveBeenCalled();
    });

    it('sets the previous verse', () => {
      const props = getProps({
        currentVerseKey: '1:2',
        currentFile: fileMock,
      });
      const wrapper = shallow(<Audioplayer {...props} />);
      const { setCurrentVerseKey } = props;
      const instance = wrapper.instance() as Audioplayer;

      instance.handleVerseChange(DIRECTIONS.PREVIOUS);

      expect(setCurrentVerseKey).toHaveBeenCalled();
      expect(setCurrentVerseKey).toHaveBeenCalledWith('1:1', true);
    });
  });
});
