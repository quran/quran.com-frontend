// import React, { Component, PropTypes } from 'react';
//
// const wiki = {
//   "1":"Al-Fatiha",
//   "2":"Al-Baqara",
//   "3":"Al Imran",
//   "4":"An-Nisa",
//   "5":"Al-Ma'ida",
//   "6":"Al-An'am",
//   "7":"Al-A'raf",
//   "8":"Al-Anfal",
//   "9":"At-Tawba",
//   "10":"Yunus (sura)",
//   "11":"Hud (sura)",
//   "12":"Yusuf (sura)",
//   "13":"Ar-Ra'd",
//   "14":"Ibrahim (sura)",
//   "15":"Al-Hijr (sura)",
//   "16":"An-Nahl",
//   "17":"Al-Isra",
//   "18":"Al-Kahf",
//   "19":"Maryam (sura)",
//   "20":"Ta-Ha",
//   "21":"Al-Anbiya",
//   "22":"Al-Hajj",
//   "23":"Al-Mu'minoon",
//   "24":"An-Nur",
//   "25":"Al-Furqan",
//   "26":"Ash-Shu'ara",
//   "27":"An-Naml",
//   "28":"Al-Qasas",
//   "29":"Al-Ankabut",
//   "30":"Ar-Rum",
//   "31":"Luqman (sura)",
//   "32":"As-Sajda",
//   "33":"Al-Ahzab",
//   "34":"Saba (sura)",
//   "35":"Fatir",
//   "36":"Ya Sin",
//   "37":"As-Saaffat",
//   "38":"Sad (sura)",
//   "39":"Az-Zumar",
//   "40":"Ghafir",
//   "41":"Fussilat",
//   "42":"Ash-Shura",
//   "43":"Az-Zukhruf",
//   "44":"Ad-Dukhan",
//   "45":"Al-Jathiya",
//   "46":"Al-Ahqaf",
//   "47":"Muhammad (sura)",
//   "48":"Al-Fath",
//   "49":"Al-Hujurat",
//   "50":"Qaf (sura)",
//   "51":"Adh-Dhariyat",
//   "52":"At-Tur",
//   "53":"An-Najm",
//   "54":"Al-Qamar",
//   "55":"Ar-Rahman",
//   "56":"Al-Waqi'a",
//   "57":"Al-Hadid",
//   "58":"Al-Mujadila",
//   "59":"Al-Hashr",
//   "60":"Al-Mumtahina",
//   "61":"As-Saff",
//   "62":"Al-Jumua",
//   "63":"Al-Munafiqun",
//   "64":"At-Taghabun",
//   "65":"At-Talaq",
//   "66":"At-Tahrim",
//   "67":"Al-Mulk",
//   "68":"Al-Qalam",
//   "69":"Al-Haaqqa",
//   "70":"Al-Maarij",
//   "71":"Nuh (sura)",
//   "72":"Al-Jinn",
//   "73":"Al-Muzzammil",
//   "74":"Al-Muddathir",
//   "75":"Al-Qiyama",
//   "76":"Al-Insan",
//   "77":"Al-Mursalat",
//   "78":"An-Naba",
//   "79":"An-Naziat",
//   "80":"Abasa",
//   "81":"At-Takwir",
//   "82":"Al-Infitar",
//   "83":"Al-Mutaffifin",
//   "84":"Al-Inshiqaq",
//   "85":"Al-Burooj",
//   "86":"At-Tariq",
//   "87":"Al-Ala",
//   "88":"Al-Ghashiyah",
//   "89":"Al-Fajr (sura)",
//   "90":"Al-Balad",
//   "91":"Ash-Shams",
//   "92":"Al-Lail",
//   "93":"Ad-Dhuha",
//   "94":"Al-Inshirah",
//   "95":"At-Tin",
//   "96":"Al-Alaq",
//   "97":"Al-Qadr (sura)",
//   "98":"Al-Bayyina",
//   "99":"Az-Zalzala",
//   "100":"Al-Adiyat",
//   "101":"Al-Qaria",
//   "102":"At-Takathur",
//   "103":"Al-Asr",
//   "104":"Al-Humaza",
//   "105":"Al-Fil",
//   "106":"Quraysh (sura)",
//   "107":"Al-Ma'un",
//   "108":"Al-Kawthar",
//   "109":"Al-Kafirun",
//   "110":"An-Nasr",
//   "111":"Al-Masadd",
//   "112":"Al-Ikhlas",
//   "113":"Al-Falaq",
//   "114":"Al-Nas"
// };
//
// class SurahInfo extends Component {
//   static propTypes = {
//     isExpanded: PropTypes.bool,
//     currentSurah: PropTypes.object,
//     loadInfo: PropTypes.func
//   }
//
//   static defaultProps = {
//     isExpanded: false
//   }
//
//   componentWillUpdate(nextProps, nextState) {
//     if (!nextProps.isExpanded) {
//       return;
//     }
//
//     var self = this;
//     let link = this.props.wikiLinks[nextProps.currentSurah.id];
//
//     $.ajax( {
//       url: `http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=${link}&redirects=true`,
//       dataType: 'jsonp',
//       type: 'get',
//       headers: {'Api-User-Agent': 'Example/1.0', 'Identify-Me': 'quran.com, mmahalwy@gmail.com'}
//     }).then(function(r) {
//       var page = Object.keys(r.query.pages)[0];
//
//       self.setState({
//         page: r.query.pages[page]
//       });
//
//       return;
//     });
//   }
//
//   renderInformation() {
//     var extract = this.state.page ? this.state.page.extract : '';
//
//     return (
//       <div className="col-md-12 surah-info">
//       <div className="row">
//         <div className="col-md-3 col-xs-6 bg" style={{background: `url(/images/${this.props.currentSurah.revelation.place}.jpg) center center no-repeat`}}>
//         </div>
//         <div className="col-md-1 col-xs-6 list">
//           <dl>
//             <dt>CLASSIFICATION</dt>
//             <dd className="text-capitalize">{this.props.currentSurah.revelation.place}</dd>
//             <dt>ORDER</dt>
//             <dd className="text-uppercase">{this.props.currentSurah.revelation.order}</dd>
//             <dt>VERSES</dt>
//             <dd className="text-uppercase">{this.props.currentSurah.ayat}</dd>
//           </dl>
//         </div>
//         <div className="col-md-8 info" dangerouslySetInnerHTML={{__html: extract}}>
//         </div>
//       </div>
//       </div>
//     );
//   }
//
//   render() {
//     if (this.props.isExpanded) {
//       return this.renderInformation();
//     }
//     else {
//       return <div />;
//     }
//   }
// }
