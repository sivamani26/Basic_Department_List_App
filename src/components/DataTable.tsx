// src/components/DataTable.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const DataTable: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((posts) => setData(posts))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Data Table
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.userId}</TableCell>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
