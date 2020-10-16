<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="Es3_SqlServer._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Label ID="Label3" runat="server" Text="Nome"></asp:Label>
            <asp:TextBox ID="txtNome" runat="server" ></asp:TextBox>
            <br />
            <asp:Label ID="Label4" runat="server" Text="Cognome"></asp:Label>
            <asp:TextBox ID="txtCognome"  runat="server" ></asp:TextBox>
            <br />
            <asp:Label ID="lblRegioni" runat="server" Text="Regioni"></asp:Label>
            <asp:DropDownList AutoPostBack="true" ID="cmbRegioni" runat="server" OnSelectedIndexChanged="cmbRegioni_SelectedIndexChanged"></asp:DropDownList>
            <br />
            <asp:Label ID="Label1" runat="server" Text="Province"></asp:Label>
            <asp:DropDownList AutoPostBack="true" ID="cmbProvince" runat="server" OnSelectedIndexChanged="cmbProvince_SelectedIndexChanged"></asp:DropDownList>
            <br />
            <asp:Label ID="Label2" runat="server" Text="Comuni:"></asp:Label>
            <asp:DropDownList ID="cmbComuni" runat="server"></asp:DropDownList>
            <br />
            <asp:Calendar  ID="DatePicker" runat="server"></asp:Calendar>
            <br />
            <asp:Button ID="btnInvia"  runat="server" Text="Button" OnClick="btnInvia_Click" />
            <asp:Label ID="lblRis" runat="server" Text=""></asp:Label>
        </div>
    </form>
</body>
</html>
