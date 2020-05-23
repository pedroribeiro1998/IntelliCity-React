function decrypt(text) {
    const crypto = require('../../crypto');
    const ENCRYPTION_KEY = 'My32charPasswordAndInitVectorStr'; // Must be 256 bits (32 characters)
    const IV_LENGTH = 'My32charPassword'; // For AES, this is always 16
    let decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      ENCRYPTION_KEY,
      IV_LENGTH,
    );
    let decrypted = decipher.update(text, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
  
    return decrypted;
  }
  
  function encrypt(text) {
    const crypto = require('../../crypto');
    const ENCRYPTION_KEY = 'My32charPasswordAndInitVectorStr'; // Must be 256 bits (32 characters)
    const IV_LENGTH = 'My32charPassword'; // For AES, this is always 16
    let cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV_LENGTH);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
  
    return encrypted;
  }
  
  export function PostData(type, userData) {
    let BaseURL = 'https://cmapi2020.000webhostapp.com/smart/';
    let encrypted = {msg: encrypt(JSON.stringify(userData))};
  
    return new Promise((resolve, reject) => {
      fetch(BaseURL + type, {
        method: 'POST',
        body: JSON.stringify(encrypted),
      })
        .then(response => response.json())
        .then(res => {
          let decrypted = decrypt(res.msg);
          let decryptedJSON = JSON.parse(decrypted);
          resolve(decryptedJSON);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  