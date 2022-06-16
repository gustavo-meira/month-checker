import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Container,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { userEmailExist } from '../helpers/axios/userEmailExist';
import { createUser } from '../helpers/axios/createUser';
import { passwordValidator } from '../helpers/validators/passwordValidator';
import { emailValidator } from '../helpers/validators/emailValidator';
import { usernameValidator } from '../helpers/validators/usernameValidator';
import { FormsInputLabel } from '../components/FormsInputLabel';

export const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    const body = {
      username,
      email,
      password,
    };

    const passwordError = passwordValidator(password);
    const emailError = emailValidator(email);
    const usernameError = usernameValidator(username);

    if (passwordError) {
      setErrors({ ...errors, password: passwordError });
      return;
    }

    if (emailError) {
      setErrors({ ...errors, email: emailError });
      return;
    }

    if (usernameError) {
      setErrors({ ...errors, username: usernameError });
      return;
    }

    const response = await createUser(body);
    if (response) {
      navigate('/');
      toast({
        title: 'Sucesso',
        description: 'Usuário criado com sucesso.',
        status: 'success',
        duration: 9000,
      });
      return;
    }
    toast({
      title: 'Erro',
      description: 'Não foi possível criar o usuário. Tente novamente mais tarde.',
      status: 'error',
      duration: 9000,
    });
  };

  const handleOnBlur = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = e.target;
    if (value === '') return;
    const valid = await userEmailExist({ [name]: value });
    if (!valid) {
      setErrors({ ...errors, [name]: `${name} já foi cadastrado, considere usar outro.` });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const checkSubmitButtonDisabled = (): boolean => {
    const { username: usernameError, email: emailError, password: passwordError } = errors;
    if (username === '' || email === '' || password === '') return true;
    return usernameError !== '' || emailError !== '' || passwordError !== '';
  };

  return (
    <Container display="flex" height="100vh" justifyContent="center" alignItems="center">
      <FormControl>
        <Heading>Criação de novo usuário</Heading>
        <FormsInputLabel
          label="Nome de usuário*"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          error={errors.username}
          placeholder="johncena"
          onBlur={handleOnBlur}
          type="text"
          name="username"
        />
        <FormsInputLabel
          label="Email*"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          error={errors.email}
          placeholder="john@cena.com"
          onBlur={handleOnBlur}
          type="email"
          name="email"
        />
        <FormsInputLabel
          label="Senha*"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={errors.password}
          placeholder="********"
          type="password"
          name="password"
        />
        <FormHelperText>Todos os campos marcados com * são obrigatórios</FormHelperText>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={checkSubmitButtonDisabled()}
          colorScheme="blue"
        >
          Cadastrar-se
        </Button>
      </FormControl>
    </Container>
  );
};
