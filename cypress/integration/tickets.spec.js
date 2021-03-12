describe("Tickets", () => {
  beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"))
  
  /* it.only -> executa somente esse bloco (moca/moka???) */
  it("fills all the text input fields", () => {

    const tipo_comida = "carne"

    const var1 = "Renato"
    const var2 = "Renato Daniel"
    const var3 = "Guerra Brito"

    /* ---------------------------------- */
    /*           BLOCO DIGITACAO          */
    /* ---------------------------------- */
    /* # = id */
    /* type = digitar */
    cy.get("#first-name").type(var1)
    cy.get("#last-name").type("Brito")
    cy.get("#email").type("teste@email.com")
    cy.get("#requests").type(tipo_comida)
    cy.get("#signature").type(`${var2} ${var3}`)
  
    /* ------------------------------------- */
    /*           BLOCO SELECT/RADIO          */
    /* ------------------------------------- */
    cy.get("#ticket-quantity").select("3")
    cy.get("#vip").check()
    cy.get("#social-media").check()
    cy.get("#friend").check()
    cy.get("#publication").check()
    cy.get("#publication").uncheck()

    /* verificações existe-não existe */
    cy.get("header h1").should("contain", "TICKETBOX")

    /* criando alias (grava situação do item no momento) */
    cy.get("#email")
      .as("email")
      .clear()
      .type("qualquercoisa.com.br")
    
    /* alias + should */
    cy.get("#email.invalid")
      .as("invalidEmail")
      .should("exist")

    /* concatena comandos ou eventos */
    cy.get("@email")
      .clear()
      .type("email@valido.com.be")

    cy.get("#email.invalid").should("not.exist")

    cy.get("button[type='submit']")
      .as("submitButton")
      .should("be.disabled")

      /* checkbox pode ser marcado com click */
    cy.get("#agree").click()

    cy.get("button[type='submit']")
      .as("submitButton")
      .should("be.not.disabled")

    cy.get("#agree").click()
  })

  /* -------------------------------------------- */

  /* -------------------------------------------- */
  
  it.only("preenchendo somente campos obrigatorios", () => {
    const customer = {
      firstName: "João",
      lastName: "Silva",
      email: "joaosilva@exemplo.com"
    }

    cy.preencherCamposObrigatorios(customer)

    cy.get("button[type='submit']")
      .as("submitButton")
      .should("not.be.disabled")

    //cy.get("button[type='reset']").uncheck()

    cy.get("@submitButton").click()

   /* -------------------------------------------------------
    cy
      .get('h1') // select by tag
      .get('.square') // select by class
      .get('#circle') // select by id
      .get('[shape="triangle"]'); // select by attribute
    ---------------------------------------------------------- */

    cy.get('.success').contains('successfully ordered')

  })
})