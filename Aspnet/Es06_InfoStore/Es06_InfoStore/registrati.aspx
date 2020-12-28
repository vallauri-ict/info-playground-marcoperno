<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="registrati.aspx.cs" Inherits="Es06_InfoStore.registrati" UnobtrusiveValidationMode="None" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphHead" runat="server">
    <script type="text/javascript">
        function textValidation(source, arguments) {
            if (arguments.Value.length >= 2)
                arguments.IsValid = true;
            else
                arguments.IsValid = false;
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphNavBar" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphBody" runat="server">
    <div class="form-signin">
        <h2 class="form-signin-heading">Form registrazione</h2>
        <asp:Label ID="Label1" runat="server" Text="Cognome:"></asp:Label>
        <asp:TextBox ID="txtCognome" runat="server" CssClass="form-control" placeholder="Cognome"></asp:TextBox>
        <asp:CustomValidator ID="CustValCognome" runat="server" ErrorMessage="Cognome non valido" ControlToValidate="txtCognome" Display="Dynamic" OnServerValidate="CustValTextValidation_ServerValidate" ClientValidationFunction="textValidation" ForeColor="Red" ValidateEmptyText="True"></asp:CustomValidator>
        <br />
        <asp:Label ID="Label2" runat="server" Text="Nome:"></asp:Label>
        <asp:TextBox ID="txtNome" runat="server" CssClass="form-control" placeholder="Nome"></asp:TextBox>
        <asp:CustomValidator ID="CustValNome" runat="server" ErrorMessage="Nome non valido" ControlToValidate="txtNome" Display="Dynamic" OnServerValidate="CustValTextValidation_ServerValidate" ClientValidationFunction="textValidation" ForeColor="Red" ValidateEmptyText="True"></asp:CustomValidator>
        <br />
        <asp:Label ID="lblDataNascita" runat="server" Text="Data di nascita:"></asp:Label>
        <asp:TextBox ID="txtDataNascita" runat="server" CssClass="form-control" placeholder="Data di nascita" TextMode="Date"></asp:TextBox>
        <asp:Label ID="Label3" runat="server" Text="Città:"></asp:Label>
        <asp:CustomValidator ID="CustValDataNascita" runat="server" ErrorMessage="Data Nascita non valida" ControlToValidate="txtDataNascita" Display="Dynamic" OnServerValidate="CustValDataNascita_ServerValidate" ForeColor="Red" ValidateEmptyText="True"></asp:CustomValidator>
        <br />
        <asp:TextBox ID="txtCitta" runat="server" CssClass="form-control" placeholder="Città"></asp:TextBox>
        <asp:CustomValidator ID="CustValCitta" runat="server" ErrorMessage="Città non valida" ControlToValidate="txtCitta" Display="Dynamic" OnServerValidate="CustValTextValidation_ServerValidate" ClientValidationFunction="textValidation" ForeColor="Red" ValidateEmptyText="True"></asp:CustomValidator>
        <br />
        <asp:Label ID="Label4" runat="server" Text="Telefono:"></asp:Label>
        <asp:TextBox ID="txtTelefono" runat="server" CssClass="form-control" placeholder="Telefono"></asp:TextBox>
        <asp:Label ID="Label5" runat="server" Text="Email:"></asp:Label>
        <asp:TextBox ID="txtEmail" runat="server" CssClass="form-control" placeholder="Email"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidatorMail" runat="server" ErrorMessage="Email obbligatoria" ControlToValidate="txtEmail" Display="Dynamic" ForeColor="Red"></asp:RequiredFieldValidator>
        <asp:RegularExpressionValidator ID="RegularExpressionValidatorMail" runat="server" ErrorMessage="Email non valida" ControlToValidate="txtEmail" ForeColor="Red" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" Display="Dynamic"></asp:RegularExpressionValidator>
        <asp:CustomValidator ID="CustValMail" runat="server" ErrorMessage="Email non valida" ControlToValidate="txtEmail" Display="Dynamic" OnServerValidate="CustValMail_ServerValidate" ForeColor="Red"></asp:CustomValidator>
        <br />
        <asp:Label ID="Label6" runat="server" Text="Iban:"></asp:Label>
        <asp:TextBox ID="txtIban" runat="server" CssClass="form-control" placeholder="Iban"></asp:TextBox>
        <asp:Label ID="Label7" runat="server" Text="Password:"></asp:Label>
        <asp:TextBox ID="txtPassword" runat="server" CssClass="form-control" placeholder="Password" TextMode="Password"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidatorPWD" runat="server" ErrorMessage="Password obbligatoria" ControlToValidate="txtPassword" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
        <br />
        <asp:Label ID="Label8" runat="server" Text="Conferma password:"></asp:Label>
        <asp:TextBox ID="txtConfermaPassword" runat="server" CssClass="form-control" placeholder="Conferma Password" TextMode="Password"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidatorConPWD" runat="server" ErrorMessage="Password obbligatoria" ControlToValidate="txtConfermaPassword" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
        <asp:CompareValidator ID="CompareValidator1" runat="server" ErrorMessage="La password non coincidono" ControlToCompare="txtPassword" ControlToValidate="txtConfermaPassword" Display="Dynamic" ForeColor="Red"></asp:CompareValidator>
        <br />
        <asp:Button ID="btnRegistrati" runat="server" Text="Registrati" CssClass="btn btn-lg btn-primary btn-block" OnClick="btnRegistrati_Click" />
        <br />
        <asp:Label ID="lblErrore" ForeColor="Red" runat="server" Text=""></asp:Label><asp:Label ID="lblMessaggio" ForeColor="Green" runat="server" Text=""></asp:Label>
    </div>
</asp:Content>
