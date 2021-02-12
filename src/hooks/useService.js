import axios from "axios";
import bcrypt from "bcryptjs";
import { baseUrl, API_KEY } from "../services";

const useService = () => {
  const createValidation = (
    { fileId, base64, motivation },
    setError,
    setMessage,
    setLoading
  ) => {
    setLoading(true);
    axios
      .post(baseUrl + "/validation?key=" + API_KEY, {
        fileId,
        base64,
        motivation,
      })
      .then(result => {
        if (result?.statusCode !== "200") {
          setError(true);
        } else {
          setError(null);
        }
        setMessage(result.data);
      })
      .catch(err => {
        setMessage(
          "Erro ao fazer validação, verifique se o id foi digitado corretamente."
        );
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const getValidationsByDocumentId = (
    documentId,
    setError,
    setValidations,
    setLoading
  ) => {
    setLoading(true);
    axios
      .get(baseUrl + "/validations/" + documentId + "?key=" + API_KEY)
      .then(result => {
        setValidations(result.data);
        setError(null);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  const postUser = (
    { fullName, username, password, email, phones },
    setError,
    setMessage,
    setShouldUpdate,
    setLoading
  ) => {
    setLoading(true);
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        setError(err);
      }
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          setError(err);
        }
        axios
          .post(baseUrl + "/users?key=" + API_KEY, {
            fullName,
            username,
            password: hash,
            email,
            phones,
          })
          .then(result => {
            setError(null);
            setMessage("Usuário inserido com sucesso");
            setShouldUpdate(true);
          })
          .catch(err => {
            setError(true);
            setMessage("Erro ao inserir usuário");
          })
          .finally(() => setLoading(false));
      });
    });
  };

  const getUserbyUsername = async (username, setLoading, setError) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/users/username/${username}?key=${API_KEY}`
      );
      return data;
    } catch (err) {
      if (err.message) {
        setError(err.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUsers = (setError, setUsers, setShowAlert, setLoading) => {
    setLoading(true);
    axios
      .get(baseUrl + "/users?key=" + API_KEY)
      .then(result => {
        setUsers(result?.data);
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
      .delete(baseUrl + `/users/${id}?key=` + API_KEY)
      .then(result => {
        setMessage(result?.data);
        setError(null);
        setShouldUpdate(true);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  const putUser = (
    { id, fullName, username, password, email, phones },
    setError,
    setMessage,
    setShouldUpdate,
    setLoading
  ) => {
    setLoading(true);
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        setError(err);
      }
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          setError(err);
        }
        axios
          .put(baseUrl + `/users/${id}?key=` + API_KEY, {
            fullName,
            username,
            password: hash,
            email,
            phones,
          })
          .then(result => {
            setShouldUpdate(true);
            setError(null);
            setMessage(result.data);
          })
          .catch(err => {
            setError(err);
          })
          .finally(() => setLoading(false));
      });
    });
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
      .post(baseUrl + "/documents?key=" + API_KEY, {
        userId: UserId,
        name: Filename,
        base64: File,
      })
      .then(result => {
        if (result.status !== 200) {
          setError(true);
        } else {
          setError(null);
        }
        setMessage(result.data);
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
    axios
      .delete(baseUrl + "/documents/" + id + "?key=" + API_KEY)
      .then(result => {
        setMessage(result?.data);
        if (result?.status !== "200") {
          setError(true);
        } else {
          setError(false);
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
      .get(baseUrl + "/documents/" + userId + "?key=" + API_KEY)
      .then(result => {
        setFiles(
          result?.data?.map(file => ({
            id: file.documentId,
            url: file.url,
            name: file.name,
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
    getUserbyUsername,

    postFile,
    getFilesByUser,
    deleteFile,
  };
};

export default useService;
