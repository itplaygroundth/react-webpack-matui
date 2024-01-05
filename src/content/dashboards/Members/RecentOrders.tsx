import { Card } from '@mui/material';
import { CryptoOrder,Members } from '@src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';

function RecentOrders() {
  const [users,setUsers] = useState<Members[]>([]);
 

 
  //const fetcher = useFetcher();
  
  const fetchUserData = async () => {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiIwODU4NTI4NDIyIiwicm9sZSI6InNhIiwiaWF0IjoxNjkzNjU1MjQzfQ.Ti2Ksp9gIv60d6_i086VBouTNVHusH-YlqIVN1RMCSs");
  myHeaders.append("'Content-Type","application/json'")


  var requestOptions:Object = {
    mode: 'cors',
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  
   await fetch("https://wallet.tsxbet.net/api/Users/GetUsers", requestOptions)
    .then(response => {
      return response.json()
    })
    .then(data => {

     
      if(data.status)
      setUsers(data.data)
    })
 
  }
    useEffect( () => {
      try {
      //  setLoading(true);
        fetchUserData()
      } catch (error) {
      //  setError(error);
      } finally {
       // setLoading(false);
      }
    
   
    }, [])

  return (
    <Card>
      <RecentOrdersTable members={users} />
    </Card>
  );
}

export default RecentOrders;
