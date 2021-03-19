<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="produciArticolo.aspx.cs" Inherits="WebApplication1.produciArticolo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:DropDownList ID="cmbProdottoFinito" runat="server"></asp:DropDownList>
            <asp:TextBox ID="txtQta" runat="server"></asp:TextBox>
            <asp:Button ID="btnProduci" runat="server" Text="Produci" OnClick="btnProduci_Click" />
        </div>
    </form>
</body>
</html>
