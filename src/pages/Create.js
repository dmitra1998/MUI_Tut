import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function Create() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('money');

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   setTitleError(false);
  //   setDetailsError(false);

  //   if(title === '') setTitleError(true);
  //   if(details === '') setDetailsError(true);

  //   if(title && details){
  //     fetch('http://localhost:8000/notes', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ title, details, category })
  //     }).then(() => {
  //       // Example: navigate to home after submit
  //       navigate('/');
  //     })
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTitleError(false);
    setDetailsError(false);

    if(title === '') setTitleError(true);
    if(details === '') setDetailsError(true);

    if (!title ||  !details || !category) {
      //toast.error("All fields are required");
      return;
    }

    //setUploading(true);

    const { data, error } = await supabase
      .from('Notes')
      .insert([{ title, details, category }])
    
    if (error) {
      console.log(error)
    }
    if (data) {
      
    }
    setTitle('');
    setDetails('');  
    setCategory('');
    navigate('/');
  };

  return (
    <Container>
      <Typography
        variant='h6' 
        component='h2'
        color='textSecondary'
        gutterBottom>
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          sx={{marginTop:"20px", marginBottom:"20px", display: 'block'}}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          sx={{marginTop:"20px", marginBottom:"20px", display: 'block'}}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl sx={{marginTop:"20px", marginBottom:"20px", display: 'block'}}>
          <FormLabel>Note category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio color="secondary"/>} label="Money"/>
            <FormControlLabel value="todos" control={<Radio color="secondary"/>} label="Todos"/>
            <FormControlLabel value="reminders" control={<Radio color="secondary"/>} label="Reminders"/>
            <FormControlLabel value="work" control={<Radio color="secondary"/>} label="Work"/>
          </RadioGroup>
        </FormControl>

        <Button 
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          >
          Submit
        </Button>
      </form>
    </Container>
  )
}
