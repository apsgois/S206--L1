Feature: Testando API Pokemon

  Background: Executa antes de cada teste
    * def url_base = "https://pokeapi.co/api/v2/"


  Scenario: Criar um novo usuario não autorizado com gorestAPI
    Given url "https://gorest.co.in/public/v2"
    And path '/users'
    And request {name:"Teste 12345442324",email:"deepankar_trivedi_i@damore.example",gender:"male",status:"inactive"}
    When method POST
    Then status 401


  Scenario: Obter informações sobre um grupo de ovos pelo ID
    Given url url_base
    And path '/egg-group/1'
    When method get
    Then status 200
    And match response.name == 'monster'
    And match response.names[0].name == 'かいじゅう'
    And match response.pokemon_species[0].name == 'bulbasaur'

  Scenario: Obter informações sobre genders
    Given url url_base
    And path 'gender/1'
    When method get
    Then status 200
    And match response.name == 'female'
    And match response.pokemon_species_details[0].pokemon_species.name == 'bulbasaur'



  Scenario: Testando o retorno clefairy e verificando o JSON
    Given url url_base
    And path "/pokemon/clefairy"
    When method get
    Then status 200
    And match response.name == "clefairy"
    And match response.id == 35

  Scenario: Testando o retorno pokemon blue e entrando em um  dos elementos do array de idiomas e testando o retorno do JSON
    Given url url_base
    And path "/version/2"
    When method get
    Then status 200
    And def idioma = $.names[1].language.url
    And print idioma
    And url idioma
    When method get
    Then status 200
    Then match response.name == "ko"
    And match response.id == 3