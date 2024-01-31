import { getKeypairFromEncryptedKey } from '.';

(async () => {
  try {
    // Get the secret key encoded in base58 and decode but decrypt first

    const encryptPrivKey =
      'd5d34bfcd788a6dcbf30f92105ec279ab857efdec77374719d74a43f3a1469970993573dd0ee880c97816cafc383bad175dc4f1cc74c30cdd3c86dc0674223f898ce0e0c3dfd994269bb9c994d2610315f4974bab0602ef5';

    const keypair = getKeypairFromEncryptedKey(encryptPrivKey);
    console.log((await keypair).publicKey);
    // Convert the bytes to a list of integers
    // const secretKeyIntList = Array.from(secretKey);
    // console.log(JSON.stringify(secretKeyIntList));
    // Store the list in a JSON file
    // fs.writeFileSync('solana_keypair.json', JSON.stringify(secretKeyIntList));

    // console.log("Keypair generated and stored in 'solana_keypair.json'");

    // // Export the function outside the try block
    // function loadWalletKeypair(keypairFile: any): Keypair {
    //   const loaded = Keypair.fromSecretKey(new Uint8Array(keypairFile));
    //   return loaded;
    // }

    //     // Usage example:
    //     const keypairFile = fs.readFileSync('solana_keypair.json');
    //     const loadedKeypair = loadWalletKeypair(keypairFile);
    //     console.log('Loaded Keypair:', loadedKeypair.toBase58());
  } catch (error) {
    console.error('Error:', error);
  }
})();
