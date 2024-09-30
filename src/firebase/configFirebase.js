import { initializeApp } from "firebase/app";

/**
 * getStorage nos permite conectarnos a la base de datos, este pide como parametro la configuración de firebase.
 * ref nos permite crear referencias a la ruta donde se guardan los archivos
 * uploadBytes es una función que recibe como parametro la referencia donde se guardara y el archivo que se desea subir y devuelve la url del archivo subido.
 * getDownloadURL nos permite obtener la url de descarga
 * listAll nos permite obtener todas las imagenes
 */
// Importando firebase/storage de firebase
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

/**
 * Configuración de Firebase para subir imagenes
 */
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_APIK_KEY,
    authDomain: import.meta.env.VITE_API_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_API_PROJECTID,
    storageBucket: import.meta.env.VITE_API_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_API_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_API_APP_ID,
    measurementId: import.meta.env.VITE_API_MEASUREMENT_ID
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

/**
 * La función subirImagenFirebase nos permite subir archivos a firebase, esta recibe como parametro un archivo
 */
export async function subirImagenFirebase(file) {
    // const storageRef = ref(storage, uuidv4());
    // const storageRef = ref(storage, file.name);
    const storageRef = ref(storage, "saveImages/" + uuidv4() + "__" + file.name);

    /*
    const storageRef = ref(storage, `images/${file.name}`);
    return uploadBytes(storageRef, file);
    */

    await uploadBytes(storageRef, file);
    const urlFoto = await getDownloadURL(storageRef);
    return urlFoto;

    /*
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Archivo subido!", snapshot);
    });
    */
}

/**
 * La función fetchImages nos permite obtener todas las imagenes subidas a Firebase
 */
export async function obtenerImagenesFirebase() {
    const listRef = ref(storage, "saveImages/"); // Referencia a la carpeta "saveImages/" en Firebase Storage.
    const res = await listAll(listRef); // Obtiene todas las referencias de los archivos dentro de la carpeta.
    const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef)) // Obtiene las URLs de descarga de cada archivo.
    );
    return urls; // Devuelve un array de URLs.
}