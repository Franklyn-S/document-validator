import axios from "axios";
import useAuth from "./useAuth";
import { validationService, userService, fileService } from "../services";

const useService = () => {
  const { getAuthenticatedUser } = useAuth();

  const createValidation = (
    { fileId, base64, motivation },
    setError,
    setMessage,
    setLoading
  ) => {
    setLoading(true);
    axios
      .post(validationService, {
        httpMethod: "POST",
        fileId,
        base64,
        motivation,
      })
      .then(result => {
        console.log(result.data);
        if (result?.data?.data?.statusCode !== "200") {
          setError(true);
        } else {
          setError(null);
        }
        setMessage(result?.data?.data?.message);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  const getValidationsByDocumentId = (
    id,
    setError,
    setValidations,
    setLoading
  ) => {
    getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        setError(err);
        return;
      }
      setLoading(true);
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
        .catch(err => setError(err))
        .finally(() => setLoading(false));
    });
  };

  const postUser = (
    { name, username, password, email },
    setError,
    setMessage,
    setShouldUpdate,
    setLoading
  ) => {
    setLoading(true);
    axios
      .post(userService, {
        httpMethod: "POST",
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
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  const getUsers = (setError, setUsers, setShowAlert, setLoading) => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  };
  const deleteUser = (
    id,
    setError,
    setMessage,
    setShouldUpdate,
    setLoading
  ) => {
    setLoading(true);
    axios
      .delete(userService, {
        data: { id, httpMethod: "DELETE" },
      })
      .then(result => {
        console.log(result);
        setMessage(result?.data?.data?.message || result?.data?.errorMessage);
        setError(null);
        setShouldUpdate(true);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  const putUser = (
    { id, name, username, password, email },
    setError,
    setMessage,
    setShouldUpdate,
    setLoading
  ) => {
    setLoading(true);
    axios
      .put(userService, {
        httpMethod: "PUT",
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
      })
      .finally(() => setLoading(false));
  };

  const postFile = (
    { UserId, Filename, File },
    setError,
    setMessage,
    setShouldUpdate,
    setShowAlert,
    setLoading
  ) => {
    setLoading(true);
    axios
      .post(fileService, {
        httpMethod: "POST",
        UserId,
        Filename,
        File,
      })
      .then(result => {
        console.log(result.data);
        if (result?.data?.data?.statusCode !== "200") {
          setError(true);
        } else {
          setError(null);
        }
        setMessage(result?.data?.data?.message);
        setShouldUpdate(true);
      })
      .catch(err => setError(err))
      .finally(() => {
        setShowAlert(true);
        setLoading(false);
      });
  };

  const deleteFile = (
    id,
    setError,
    setMessage,
    setShouldUpdate,
    setShowAlert,
    setLoading
  ) => {
    setLoading(true);
    console.log("test");
    axios
      .delete(fileService, {
        data: { FileId: id, httpMethod: "DELETE" },
      })
      .then(result => {
        console.log(result);
        setMessage(result?.data?.data?.message);
        if (result?.data?.data?.statusCode !== "200") {
          setError(true);
        } else {
          setError(null);
        }
        setShouldUpdate(true);
      })
      .catch(err => setError(err))
      .finally(() => {
        setLoading(false);
        setShowAlert(true);
      });
  };

  const getFilesByUser = (
    userId,
    setError,
    setFiles,
    setMessage,
    setShowAlert,
    setLoading
  ) => {
    setLoading(true);
    axios
      .get(fileService + userId)
      .then(result => {
        console.log(result);
        setFiles(
          result?.data?.map(file => ({
            id: file.FileId,
            path: file.Path,
            name: file.Path?.split("/")[1],
          }))
        );
      })
      .catch(err => {
        setError(err);
        setShowAlert(true);
        setMessage("Erro ao pegar os arquivos");
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return {
    createValidation,
    getValidationsByDocumentId,

    postUser,
    getUsers,
    deleteUser,
    putUser,

    postFile,
    getFilesByUser,
    deleteFile,
  };
};

export default useService;
