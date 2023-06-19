import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const formValidationSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof formValidationSchema>

export default function SearchForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>({
    resolver: zodResolver(formValidationSchema),
  })

  function handleSearchTransactions(data: SearchFormInputs) {
    console.log(data);
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
