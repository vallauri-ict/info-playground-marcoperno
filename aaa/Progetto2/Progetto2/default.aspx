<%@ Page Async="true" Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="Progetto2._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Button ID="btn" runat="server" Text="Button" OnClick="btn_Click" />
            <asp:TextBox ID="txt" runat="server"></asp:TextBox>
        </div>
    </form>
</body>
</html>
