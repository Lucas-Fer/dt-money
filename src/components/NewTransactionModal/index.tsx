import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay } from './styles';
import { X } from 'phosphor-react';

export default function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Transação</Dialog.Title>
        <CloseButton>
          <X />
        </CloseButton>

        <form action="">
          <input type="text" placeholder='Descrição' required />
          <input type="number" placeholder='Preço' required />
          <input type="text" placeholder='Categoria' required />

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
