<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="Es2___autopostback._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h1>Esempio di AutoPostBack</h1>
            <asp:CheckBox runat="server" ID="chkAutoPostBack" Text="abilita chkAutoPostBack" OnCheckedChanged="chkAutoPostBack_CheckedChanged"/>
            <br />
            <br />
            <asp:DropDownList ID="cmbColore" runat="server" OnSelectedIndexChanged="cmbColore_SelectedIndexChanged"></asp:DropDownList>
            <br />
            <br />
            <asp:Panel ID="Panel1" Width="222px" runat="server" Height="100px"></asp:Panel>
            <br />
            <asp:Button ID="Button1" runat="server" Text="Submit" OnClick="Button1_Click" />
        </div>
    </form>
</body>
</html>
