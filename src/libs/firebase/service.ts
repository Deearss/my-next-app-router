import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import { compare, hash } from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function register(data: {
  fullname: string;
  email: string;
  password: string;
  role?: string;
  type?: string;
}) {
  //
  //
  //
  // VERIFIKASI FIELDNYA DULU BIAR TIDAK KOSONG
  if (!data.fullname)
    return { status: false, statusCode: 400, message: "Fullname is required" };
  if (!data.email)
    return { status: false, statusCode: 400, message: "Email is required" };
  if (!data.password)
    return { status: false, statusCode: 400, message: "Password is required" };
  //
  //
  //
  // CEK EKSISTENSI USER DI DATABASE FIRESTORE DENGAN EMAIL YANG SAMA DENGAN YANG DIINPUT USER, TAKUTNYA DUPLIKAT
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  //
  //
  //
  // JIKA TERNYATA DUPLIKAT MAKA KEMBALIKAN ERROR
  if (users.length > 0) {
    return { status: false, statusCode: 400, message: "Email already exist" };
  }
  //
  //
  //
  // JIKA TIDAK DUPLIKAT MAKA BUAT ROLENYA JADI MEMBER, LALU ENKRIPSI PASSWORDNYA PAKAI BCRYPT
  else {
    data.password = await hash(data.password, 10);
    data.role = "member";
    data.type = "credentials";
    //
    //
    //
    // JIKA BERHASIL MAKA SIMPAN DATA DAN KEMBALIKAN SUKSES
    try {
      await addDoc(collection(firestore, "users"), data);
      return { status: true, statusCode: 200, message: "Register Success" };
    } catch (error) {
      //
      //
      //
      // JIKA GAGAL MAKA KEMBALIKAN ERROR
      return { status: false, statusCode: 400, message: "Register Failed" };
    }
  }
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const q = query(collection(firestore, "users"), where("email", "==", email));

  const snapshot = await getDocs(q);
  const user: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))[0];

  if (user) {
    const passwordConfirm = await compare(password, user.password);
    if (passwordConfirm)
      return {
        email: user.email,
        fullname: user.fullname,
        role: user.role,
        type: user.type || "",
      };
    if (!passwordConfirm) return null;
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const snapshot = await getDocs(q);
  const user: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))[0];

  if (user) {
    data.role = user.role;
    data.type = "google";
    await updateDoc(doc(firestore, "users", user.id), data);
  } else {
    data.role = "member";
    data.type = "google";
    await addDoc(collection(firestore, "users"), data);
  }
  return data;
}
