<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="dettaglioUtente.aspx.cs" Inherits="Es04_GestioneUtente.dettaglioUtente" UnobtrusiveValidationMode="None" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Label ID="lblCognome" runat="server" Text="Cognome"></asp:Label>
            <asp:TextBox ID="txtCognome" runat="server"></asp:TextBox>
            <br /><br />
            <asp:Label ID="lblNome" runat="server" Text="Nome"></asp:Label>
            <asp:TextBox ID="txtNome" runat="server"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidatorNome" runat="server" ErrorMessage="Nome Obbligatorio"></asp:RequiredFieldValidator>
            <br /><br />
            <asp:Label ID="lblUsername" runat="server" Text="Username"></asp:Label>
            <asp:TextBox ID="txtUsername" runat="server"></asp:TextBox>
            <br /><br />
            <asp:Label ID="lblMail" runat="server" Text="Email"></asp:Label>
            <asp:TextBox ID="txtMail" runat="server"></asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidatorMail" runat="server" ErrorMessage="Email non valida" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
            <br /><br />
            <asp:Label ID="lblPwd" runat="server" Text="Password"></asp:Label>
            <asp:TextBox ID="txtPassword" runat="server" TextMode="Password"></asp:TextBox>
            <br /><br />
            <asp:Label ID="lblPwd1" runat="server" Text="Ripeti Password"></asp:Label>
            <asp:TextBox ID="txtPassword1" runat="server" TextMode="Password"></asp:TextBox>
            <asp:CompareValidator ID="CompareValidatorPassword" runat="server" ErrorMessage="Le Password non coincidono" ForeColor="Red" ControlToCompare="txtPassword1" ControlToValidate="txtPassword"></asp:CompareValidator>
            <br /><br />
            <asp:Label ID="lblDataNascita" runat="server" Text="Data Nascita"></asp:Label>
            <asp:TextBox ID="txtDataNascita" runat="server" ></asp:TextBox> <%--TextMode="Date"--%>
            <asp:RequiredFieldValidator ID="RequiredFieldValidatorDataNasc" runat="server" ErrorMessage="Data Nascita Obbligatoria"></asp:RequiredFieldValidator>
            <asp:RangeValidator ID="RangeValidatorDataNasc" runat="server" ErrorMessage="Data non Valida"></asp:RangeValidator>
            <br /><br />
            <asp:Label ID="lblRegioni" runat="server" Text="Regioni"></asp:Label>
            <asp:DropDownList ID="cmbRegioni" runat="server" OnSelectedIndexChanged="cmbRegioni_SelectedIndexChanged"></asp:DropDownList>
            <br /><br />
            <asp:Label ID="lblProvince" runat="server" Text="Province"></asp:Label>
            <asp:DropDownList ID="cmbProvince" runat="server" OnSelectedIndexChanged="cmbProvince_SelectedIndexChanged"></asp:DropDownList>
            <br /><br />
            <asp:Label ID="lblComuni" runat="server" Text="Comuni"></asp:Label>
            <asp:DropDownList ID="cmbComuni" runat="server"></asp:DropDownList>
            <br /><br />
            <asp:Button ID="btnSalva" runat="server" Text="Salva" OnClick="btnSalva_Click" />
            <br />
            <br />
            <asp:Label ID="lblMessaggio" runat="server" Text="" ForeColor="Red"></asp:Label>
        </div>
    </form>
</body>
</html>
