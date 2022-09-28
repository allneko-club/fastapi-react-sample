import Link from 'next/link'

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <button>Login</button>
      <Link href="/recoverPassword">
        <a>recover-password</a>
      </Link>
    </div>
  );
}

export default Login