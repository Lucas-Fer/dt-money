import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { TransactionsContext } from "../../../contexts/TransactionsContext";

const formValidationSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof formValidationSchema>

export default function SearchForm() {
  const { getTransactions } = useContext(TransactionsContext);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>({
    resolver: zodResolver(formValidationSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await getTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
