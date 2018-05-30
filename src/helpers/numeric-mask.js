// function* mask(input, maskInput = '(86) 1 2345 1234') {
//   var mask = maskInput;
//   var index = 0;
//   var i = 0;
//   while(input.length > index) {
//     if ( maskInput.length == i ) {
//       return;
//     }
//     if (mask[i].match(/\d/)) {
//       if(input[index].match(/\d/)){
//         i++;
//         yield input[index++];
//       }
//     }else{
//       yield mask[i++];
//     }
//   }

//   return;
// }

export default function numericMask( input = '', templateStr = '' ){
  if ( typeof input !== 'string' || typeof input !== 'string' ) {
    throw 'Parameter is not a string';
  }

  if ( input === '' ) { return ''; }  

  let index = 0;  
  let inputDigits = input.replace(/[^\d]/g, '');  

  function replacer(match, p1, p2) {
    if (p1) {
      return index < inputDigits.length ? p1 : '';      
    }

    if (p2) {
      return index < inputDigits.length ? inputDigits[index++] : '';      
    }
  }

  return templateStr.replace(
    /([^\d])|([\d])/g, replacer);
}
