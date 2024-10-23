'use client';
import { useState } from 'react';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // There has to be a const with the new User, where the infos correspond to the usestates.
  // const newUser: User = {
  //   id: 1,
  //   username: 'sara',
  //   password: 'hashedpassword',
  //   email: 'sara@example.com',
  //   role: 'user',
  //   intro_text: 'Hello, I am Sara!',
  //   profile_picture: 'profile.jpg',
  //   created_at: new Date(),  // Sets the current date and time
  // };
  return (
    <>
      <div>Hallo</div>
      <div>Welt</div>
      <form>
        <label>Name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Surname</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={async () => {
            const response = await fetch(`localhost:3000/api/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                firstName,
                lastName,
                username,
                password,
              }),
            });
            const newUser = await response.json();
            console.log(newUser);
          }}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
