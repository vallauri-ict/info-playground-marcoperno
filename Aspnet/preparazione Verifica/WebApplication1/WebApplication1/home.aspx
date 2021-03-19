<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="WebApplication1.home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Button ID="aggiornaMagazzino" runat="server" Text="aggiorna magazzione" OnClick="aggiornaMagazzino_Click"  />
            <asp:Button ID="produciArticolo" runat="server" Text="produciArticolo " OnClick="produciArticolo_Click"  />
            <asp:Button ID="ordinaComponenti" runat="server" Text="ordinaComponenti " OnClick="ordinaComponenti_Click" />
        </div>
    </form>
</body>
</html>
