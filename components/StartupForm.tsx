"use client";
import React, { useState } from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const StartupForm = () => {
    const [errors, setErros] = useState<Record<string,string>>({});
  return (
    <form action={()=>{}} className='startup-form'>
        <div>
            <label htmlFor="title" className='startup-form_label'>Title</label>
            <Input id='title' name='title' className='startup-form_input' required placeholder='Startup Title'/>
            {errors.title && <p className='startup-form_errors'>{errors.title}</p>}
        </div>

        <div>
            <label htmlFor="description" className='startup-form_label'>Description</label>
            <Textarea id='description' name='description' className='startup-form_textarea' required placeholder='Startup Description'/>
            {errors.description && <p className='startup-form_errors'>{errors.description}</p>}
        </div> 
        <div>
            <label htmlFor="category" className='startup-form_label'>Category</label>
            <Input id='category' name='category' className='startup-form_input' required placeholder='Startup Category(Tech,Education,Health...)'/>
            {errors.category && <p className='startup-form_errors'>{errors.category}</p>}
        </div>
        <div> 
            <label htmlFor="Link" className='startup-form_label'>Image URL</label>
            <Input id='link' name='link' className='startup-form_input' required placeholder='Image URL'/>
            {errors.link && <p className='startup-form_errors'>{errors.link}</p>}
        </div>
    </form>
  )
}

export default StartupForm