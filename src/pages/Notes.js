import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Container } from '@mui/material'
import NoteCard from '../components/NoteCard'
import Masonry from '@mui/lab/Masonry';

export default function Notes() {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Error fetching notes:', err))
  }, [])

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  return (
    <Container>
      {/* <Grid container spacing={3}>
        {notes.map(note=> (
          <Grid key={note.id} size={{xs: 12, sm: 6, md: 4}}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </Grid>
        ))}
      </Grid> */}
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
        {notes.map(note=> (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
