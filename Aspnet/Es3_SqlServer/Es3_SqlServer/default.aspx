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
            <asp:Label ID="lblRegioni" runat="server" Text="Regioni"></asp:Label>
            <asp:DropDownList AutoPostBack="true" ID="cmbRegioni" runat="server" OnSelectedIndexChanged="cmbRegioni_SelectedIndexChanged"></asp:DropDownList>
            <br />
            <asp:Label ID="Label1" runat="server" Text="Provnce"></asp:Label>
            <asp:DropDownList AutoPostBack="true" ID="cmbProvince" runat="server" OnSelectedIndexChanged="cmbProvince_SelectedIndexChanged"></asp:DropDownList>
            <br />
            <asp:Label ID="Label2" runat="server" Text="Comuni:"></asp:Label>
            <asp:DropDownList ID="cmbComuni" runat="server"></asp:DropDownList>
        </div>
    </form>
</body>
</html>
