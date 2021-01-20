import axios from 'axios';
import useAuth from './useAuth';
import { validationService, userService } from '../services';

const useService = () => {
  const { getAuthenticatedUser } = useAuth();

  const getValidationsByDocumentId = (id, setError, setValidations) => {
    getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        setError(err);
        return;
      }
      axios
        .get(validationService + id, {
          headers: {
            Authorization: session.getIdToken().getJwtToken(),
          },
        })
        .then(result => {
          setValidations(result.data);
          setError(null);
        })
        .catch(err => setError(err));
    });
  };

  const postUser = (
    { name, username, password, email },
    setError,
    setMessage,
    setShouldUpdate
  ) => {
    axios
      .post(userService, {
        httpMethod: 'POST',
        name,
        username,
        password,
        email,
      })
      .then(result => {
        console.log(result.data);
        setError(null);
        setMessage(result?.data?.data?.message);
        setShouldUpdate(true);
      })
      .catch(err => setError(err));
  };

  const getUsers = (setError, setUsers, setShowAlert) => {
    axios
      .get(userService)
      .then(result => {
        console.log(result);
        setUsers(
          result?.data?.data?.map(user => ({
            id: user[0],
            name: user[1],
            username: user[2],
            password: user[3],
            email: user[4],
          }))
        );
        setError(null);
      })
      .catch(err => {
        setError(err);
        setShowAlert(true);
        console.log(err);
      });
  };
  const deleteUser = (id, setError, setMessage, setShouldUpdate) => {
    axios
      .delete(userService, {
        data: { id, httpMethod: 'DELETE' },
      })
      .then(result => {
        console.log(result);
        setMessage(result?.data?.data?.message);
        setError(null);
        setShouldUpdate(true);
      })
      .catch(err => setError(err));
  };

  const putUser = (
    { id, name, username, password, email },
    setError,
    setMessage,
    setShouldUpdate
  ) => {
    axios
      .put(userService, {
        httpMethod: 'PUT',
        id,
        name,
        username,
        password,
        email,
      })
      .then(result => {
        console.log(result);
        setShouldUpdate(true);
        setError(null);
        setMessage(result.data?.data?.message);
      })
      .catch(err => {
        setError(err);
      });
  };

  return {
    getValidationsByDocumentId,
    postUser,
    getUsers,
    deleteUser,
    putUser,
  };
};

export default useService;
