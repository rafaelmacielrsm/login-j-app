const serverURI = ( resource ) => `https://api.revistajus.com.br${resource}`;

export const loginRequest = ( email, password ) => (
  fetch( 
    serverURI( '/1.0/auth' ),
    {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session: { email, password }})
    }
  )
);

export const createUserRequest = ( dataObj ) => (
  fetch(
    serverURI( '/1.0/usuarios' ),
    {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',     
        'Accept': 'application/json',
      },
      body: JSON.stringify({ user: dataObj })
    }
  )
);