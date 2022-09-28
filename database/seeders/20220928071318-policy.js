'use strict';
const _ = require('lodash');
const { log } = require('winston');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const policies = [
      // Settings
      {  'group' : 'Settings', 'model' :'User'},
      {  'group' : 'Settings', 'model' :'Role'},  
      
       // 'Master Data
      {  'group' : 'Master Data', 'model' :'Categories'},  
      
      // Pets
      {  'group' : 'Pets', 'model' :'Pets'}, 
      
       // Posts
      {  'group' : 'Posts', 'model' :'Posts'},  

      // Comments
      {  'group' : 'Comments', 'model' :'Comments'},  

      // Resourses
      {  'group' : 'Resourses', 'model' :'Resourses'},  

    ];

    const actions = ['index', 'create', 'show', 'edit', 'delete'];
    let values = []

    policies.map(policy => {
      actions.map(action=>{
          const data= {
              group : policy.group,
              model : policy.model,
              action  : action,
              description: `access ${policy.model} ${action}`,
              name :  _.startCase(`${policy.model} ${action}`),
              created_at: new Date(),
              updated_at: new Date()
          }
          values.push(data)
      })
  })
    await queryInterface.bulkInsert('policies', values )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('policies', null, {});
  }
};
