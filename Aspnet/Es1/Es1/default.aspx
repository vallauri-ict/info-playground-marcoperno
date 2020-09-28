<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="Es1._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style type="text/css">
        #form1 {
            height: 90px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Label ID="lblNome" runat="server" Text="Nome"></asp:Label>

        </div>
        
        <asp:TextBox ID="txtNome" placeholder="dddd" runat="server"></asp:TextBox>
        <br />
        <asp:Button ID="btnInvia" runat="server" OnClick="Button1_Click" Text="Invia" Height="28px" Width="70px" />
        <br />
        <asp:Label ID="lblRis" runat="server" Text=""></asp:Label>
    </form>
</body>
</html>
