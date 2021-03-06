// Modules
import React, { useContext, useEffect } from 'react';

// Components
import Model from './Model';
import AddItem from './AddItem';

// Context
import { BranchContext } from '../context/BranchProvider'
import { getBranches, deleteBranch, updateBranch, addBranch } from '../actions/branches'

export default function Branches() {
  const { branches, dispatch } = useContext(BranchContext);

    // Refresh branches when components load
    useEffect(() => {
      getBranches(dispatch);
    }, [])

    const deleteBranches = (branchId)=> {
      deleteBranch(branchId, dispatch)
    }

    const updateBranches = (branchId, branchName) => {
      updateBranch(branchId, branchName, dispatch);
    }

    const addBranches = (submitText)=> {
      addBranch(submitText, dispatch);
    } 
    

    const renderBranches = () => {
      return branches.map(account => (
          <Model deleteItem={deleteBranches} editItem={updateBranches}
          key={account.id} item={account}/>
      ));
    };

    const branchStyle = {
      width: '100%',
      marginTop: '55px',
    }

    return (
      <div style={branchStyle}>
        <AddItem addItem={addBranches} placeholder={'Branch name'}/>
        {renderBranches()}
      </div>
      )
}