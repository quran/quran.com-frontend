import en from '../en';
import ar from '../ar';
import fa from '../fa';
import fr from '../fr';
import id from '../id';
import nl from '../nl';
import sq from '../sq';
import tr from '../tr';
import ur from '../ur';

describe('locale files', () => {
  const enLength = Object.keys(en).length;

  it('should have same number of keys as English', () => {
    const arLength = Object.keys(ar).length;
    const faLength = Object.keys(fa).length;
    const frLength = Object.keys(fr).length;
    const idLength = Object.keys(id).length;
    const nlLength = Object.keys(nl).length;
    const sqLength = Object.keys(sq).length;
    const trLength = Object.keys(tr).length;
    const urLength = Object.keys(ur).length;

    expect(arLength).toEqual(enLength);
    expect(faLength).toEqual(enLength);
    expect(frLength).toEqual(enLength);
    expect(idLength).toEqual(enLength);
    expect(nlLength).toEqual(enLength);
    expect(sqLength).toEqual(enLength);
    expect(trLength).toEqual(enLength);
    expect(urLength).toEqual(enLength);
  });
});
