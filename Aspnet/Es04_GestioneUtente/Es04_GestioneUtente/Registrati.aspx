<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Registrati.aspx.cs" Inherits="Es04_GestioneUtente.Registrati" %>

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
            <br /><br />
            <asp:Label ID="lblUsername" runat="server" Text="Username"></asp:Label>
            <asp:TextBox ID="txtUsername" runat="server"></asp:TextBox>
            <br /><br />
            <asp:Label ID="lblPwd" runat="server" Text="Password"></asp:Label>
            <asp:TextBox ID="txtPassword" runat="server" TextMode="Password"></asp:TextBox>
            <br /><br />
            <asp:Label ID="lblDataNascita" runat="server" Text="Data Nascita"></asp:Label>
            <asp:TextBox ID="txtDataNascita" runat="server" TextMode="Date"></asp:TextBox>
            <%--<asp:Calendar ID="Calendar1" runat="server"></asp:Calendar>--%>  
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
            <asp:Button ID="btnRegistrati" runat="server" Text="Registrati" OnClick="btnRegistrati_Click" />
            <br />
            <br />
            <asp:Label ID="lblMessaggio" runat="server" Text="" ForeColor="Red"></asp:Label>
        </div>
    </form>
</body>
</html>
