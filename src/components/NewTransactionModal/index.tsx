import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  // type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export default function NewTransactionModal() {
  const { handleSubmit, register, formState: { isSubmitting } } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  });

  function handleTransactionForm(data: NewTransactionFormInputs) {
    console.log(data);
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="" onSubmit={handleSubmit(handleTransactionForm)}>
          <input
            type="text"
            placeholder='Descrição'
            {...register('description')}
            required
          />
          <input
            type="number"
            placeholder='Preço'
            {...register('price', { valueAsNumber: true })}
            required />
          <input
            type="text"
            placeholder='Categoria'
            {...register('category')}
            required
          />

          <TransactionType>
            <TransactionTypeButton variant="income" value='income'>
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>
            <TransactionTypeButton variant="outcome" value='outcome'>
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit" disabled={isSubmitting}>Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
