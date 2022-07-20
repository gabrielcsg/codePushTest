/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';

type Repos = {
  id: number;
  name: string;
};

const Repolist: React.FC = () => {
  const [repos, setRepos] = useState<Repos[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/gabrielcsg/repos').then(response => {
      response.json().then(data => {
        setRepos(data);
      });
    });
  }, []);

  return (
    <ScrollView style={{paddingHorizontal: 20}}>
      <Text style={{marginVertical: 20, fontSize: 24, color: 'blue'}}>
        Repositorios:
      </Text>
      {repos.map(repo => (
        <Text key={repo.id}>{repo.name}</Text>
      ))}
    </ScrollView>
  );
};

export default Repolist;
