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

export const validateUserNameRequest = ( queryParam = '' ) => (
  fetch(
    serverURI( `/1.0/validar-username?username=${queryParam}` ),
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    }
  )
);

export const updateUserRequest = ( credential, id, dataObj ) => (
  fetch(
    serverURI( `/1.0/usuarios/${id}` ),
    {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',     
        'Accept': 'application/json',
        'Authorization': `Token token="${credential}"`
      },
      body: JSON.stringify({ user: dataObj })
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

export const fetchUserData = ( credential = '' ) => (
  fetch(
    serverURI( '/1.0/meu-perfil' ),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token token="${credential}"`
      }
    }
  )
)