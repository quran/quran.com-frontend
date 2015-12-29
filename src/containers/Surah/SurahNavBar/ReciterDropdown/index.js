import React, { Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';

// To save API calls.
export const slugs = [
  {
    'reciter': {
      'slug': 'abdulbaset',
      'id': 1
    },
    'name': {
      'english': 'AbdulBaset AbdulSamad (Mujawwad)',
      'arabic': 'عبد الباسط عبد الصمد (مجود)'
    },
    'style': {
      'slug': 'mujawwad',
      'id': 1
    },
    'id': 1
  },
  {
    'reciter': {
      'slug': 'abdulbaset',
      'id': 1
    },
    'name': {
      'english': 'AbdulBaset AbdulSamad (Murattal)',
      'arabic': 'عبد الباسط عبد الصمد (مرتل)'
    },
    'style': {
      'slug': 'murattal',
      'id': 2
    },
    'id': 2
  },
  {
    'reciter': {
      'slug': 'sudais',
      'id': 2
    },
    'name': {
      'english': 'Abdur-Rahman as-Sudais',
      'arabic': 'عبدالرحمن السديس'
    },
    'style': {
      'slug': null,
      'id': null
    },
    'id': 3
  },
  {
    'reciter': {
      'slug': 'shatri',
      'id': 3
    },
    'name': {
      'english': 'Abu Bakr al-Shatri',
      'arabic': 'أبو بكر الشاطرى'
    },
    'style': {
      'slug': null,
      'id': null
    },
    'id': 4
  },
  {
    'reciter': {
      'slug': 'rifai',
      'id': 4
    },
    'name': {
      'english': 'Hani ar-Rifai',
      'arabic': 'هاني الرفاعي'
    },
    'style': {
      'slug': null,
      'id': null
    },
    'id': 5
  },
  {
    'reciter': {
      'slug': 'alafasy',
      'id': 6
    },
    'name': {
      'english': 'Mishari Rashid al-`Afasy',
      'arabic': 'مشاري راشد العفاسي'
    },
    'style': {
      'slug': null,
      'id': null
    },
    'id': 8
  },
  {
    'reciter': {
      'slug': 'minshawi',
      'id': 7
    },
    'name': {
      'english': 'Muhammad Siddiq al-Minshawi (Mujawwad)',
      'arabic': 'محمد صديق المنشاوي (مجود)'
    },
    'style': {
      'slug': 'mujawwad',
      'id': 1
    },
    'id': 9
  },
  {
    'reciter': {
      'slug': 'minshawi',
      'id': 7
    },
    'name': {
      'english': 'Muhammad Siddiq al-Minshawi (Murattal)',
      'arabic': 'محمد صديق المنشاوي (مرتل)'
    },
    'style': {
      'slug': 'murattal',
      'id': 2
    },
    'id': 10
  },
  {
    'reciter': {
      'slug': 'shuraym',
      'id': 8
    },
    'name': {
      'english': 'Sa`ud ash-Shuraym',
      'arabic': 'سعود الشريم'
    },
    'style': {
      'slug': null,
      'id': null
    },
    'id': 11
  }
];

export default class ReciterDropdown extends Component {
  renderMenu() {
    return slugs.map(slug => {
      return (
        <MenuItem key={slug.name.english} eventKey={slug.name.english}>{slug.name.english}</MenuItem>
      );
    });
  }

  render() {
    const title = (
      <span>
        <i className="ss-icon ss-highvolume margin-md-right" />
        Reciters
      </span>
    );

    return (
      <NavDropdown eventKey={3} title={title} id="reciters-dropdown">
        {this.renderMenu()}
      </NavDropdown>
    );
  }
}
