"use client";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/createIssueSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const router = useRouter();
    const { register, control, handleSubmit, formState:{ errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('')
  return (
    <div className="max-w-xl">
        {error && <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
    <form className=' space-y-3'
     onSubmit={handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
     router.push('/issues');

        } catch (error) {
            setSubmitting(false)
            setError('An unexpected error occured.')
        }
        
     })}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>
      <ErrorMessage>
      {errors.title?.message}
      </ErrorMessage>
      <Controller 
      name="description"
      control={control}
      render={({field}) => <SimpleMDE placeholder='Description' {...field} /> } />
       <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={isSubmitting}  >Submit new Issue {isSubmitting &&  <Spinner/>} </Button>
    </form>
    </div>
  );
};

export default NewIssuePage
