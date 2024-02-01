import { signIn, signOut, auth } from "@/auth";
// import { useRouter } from "next/navigation";

// const router = useRouter();

function SignIn({ provider, ...props }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
        // router.push(`/`);
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  );
}

function SignOut(props) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        // router.push(`/`);
      }}
    >
      <button {...props}>Sign Out</button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();
  return (
    <header style={{ display: "flex", justifyContent: "space-around" }}>
      {session?.user ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          {session?.user.name}
          <SignOut />
        </span>
      ) : (
        <SignIn />
      )}
    </header>
  );
}
