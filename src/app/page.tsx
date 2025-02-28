import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 font-[family-name:var(--font-geist-sans)]">
      <Link href={'/signup'} type="button" className="py-2 px-4 w-10 bg-fuchsia-600 rounded">Sign Up</Link>
      <Link href={'/login'} type="button" className="py-2 px-4 w-10 border rounded">Login</Link>

      <div className="text-base font-light text-gray-500">
        "The Login & Signup page of our platform ensures a seamless and secure authentication experience for users. With a simple and intuitive interface, new users can quickly register by providing their email, username, and password, while existing users can log in effortlessly. To enhance security, our system incorporates encrypted password storage and email verification, ensuring only verified users gain access. Additionally, users can reset their passwords if needed, making account recovery hassle-free. Designed for both convenience and security, this page serves as the gateway to a personalized and engaging user experience on our platform."
      </div>
    </div>
  );
}
