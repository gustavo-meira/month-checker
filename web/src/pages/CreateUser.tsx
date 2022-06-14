import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Container,
  Input,
  Heading,
  Button,
} from '@chakra-ui/react';

export const CreateUser = () => (
  <Container>
    <FormControl>
      <Heading>Criação de novo usuário</Heading>
      <FormLabel>Nome de usuário*</FormLabel>
      <Input />
      <FormLabel>Email*</FormLabel>
      <Input />
      <FormLabel>Senha*</FormLabel>
      <Input />
      <FormHelperText>Todos os campos marcados com * são obrigatórios</FormHelperText>
      <Button>Cadastrar-se</Button>
    </FormControl>
  </Container>
);
