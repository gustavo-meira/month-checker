import React, { useEffect, useState } from 'react';
import {
  Button, Container, FormControl, Text, useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FormsInputLabel } from '../components/FormsInputLabel';
import { loginUser } from '../helpers/axios/loginUser';
import { getUser } from '../helpers/user/getUser';
import { saveUser } from '../helpers/user/saveUser';
import { emailValidator } from '../helpers/validators/emailValidator';
import { passwordValidator } from '../helpers/validators/passwordValidator';

export const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    const body = {
      email,
      password,
    };

    const emailErrors = emailValidator(email);
    const passwordErrors = passwordValidator(password);

    if (emailErrors) {
      setErrors({ ...errors, email: emailErrors });
      return;
    }

    if (passwordErrors) {
      setErrors({ ...errors, password: passwordErrors });
      return;
    }

    const user = await loginUser(body);

    if (user) {
      saveUser(user);
      navigate('/main');
      return;
    }
    toast({
      title: 'Erro',
      description: 'Não foi possível logar. Tente novamente mais tarde.',
      status: 'error',
      duration: 9000,
    });
  };

  useEffect(() => {
    if (getUser()) {
      navigate('/main');
    }
  });

  return (
    <Container display="flex" flexDir="column" height="100vh" justifyContent="center" alignItems="center">
      <FormControl>
        <FormsInputLabel
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          error={errors.email}
          placeholder="john@cena.com"
          type="email"
          name="email"
        />
        <FormsInputLabel
          label="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={errors.password}
          placeholder="********"
          type="password"
          name="password"
        />
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          Entrar
        </Button>
      </FormControl>
      <Text>
        Se ainda não possui uma conta.
        {' '}
        <Link to="/create-user">
          <Text color="blue" as="span">Cadastre-se</Text>
        </Link>
      </Text>
    </Container>
  );
};
