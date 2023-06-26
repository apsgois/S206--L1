/// <reference types="cypress" />

describe('Criando cenário de teste para o site computer', () => {
  it.skip('Caso de teste: Criar computador com sucesso', () => {
    cy.visit('https://computer-database.gatling.io/computers')
    cy.get('#add').click()
    cy.get('#name').type('teste')
    cy.get('#introduced').type('2021-05-05')
    cy.get('#discontinued').type('2021-06-05')
    cy.get('#company').select('RCA')
    cy.get('.primary').click()
    cy.get('strong').invoke('text').then((text) => {
      expect(text.trim()).to.eq('Done !')
    })
    cy.contains('Computer teste has been created').should('exist')
  })


  it.skip('Caso de teste: Criar computador com falha', () => {
    cy.visit('https://computer-database.gatling.io/computers')
    cy.get('#add').click()
    cy.get('#name').type('Jose')
    cy.get('#introduced').type('2021-05-05')
    cy.get('#discontinued').type('2021-05-05')
    cy.get('#company').select('RCA')
    cy.get('.primary').click()
    cy.get('.error > .input > .help-inline').should('have.text','Discontinued date is before introduction date' )
    
  })

  it('Buscando computador criado', () => {
    let info = criarComputador()
    cy.get('#searchbox').type(info)
    cy.get('#searchsubmit').click()

  })
})

function formatDate(date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


function criarComputador(){

  let currentDate = new Date();
  let lastMonthDate = new Date();
  lastMonthDate.setMonth(currentDate.getMonth() - 1);

  
  let number = Math.floor(Math.random() * 1000).toString()
  
  let comp = 'ACE'+ number
  
  let compInfo = comp
    cy.visit('https://computer-database.gatling.io/computers')
    cy.get('#add').click()
    cy.get('#name').type(comp)
    cy.get('#introduced').type(formatDate(lastMonthDate))
    cy.get('#discontinued').type(formatDate(currentDate))
    cy.get('#company').select('RCA')
    cy.get('.primary').click()
    cy.get('strong').invoke('text').then((text) => {
      expect(text.trim()).to.eq('Done !')
    })
    cy.contains('Computer '+ comp +' has been created').should('exist')

    return compInfo
}