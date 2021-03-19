<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="Es06_InfoStore.index" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphNavBar" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphBody" runat="server">
    <div class="jumbotron">
        <h1>Benvenuto in INFOSTORE</h1>
    </div>
    <asp:Image ID="imgLogo" runat="server" ImageUrl="~/img/raspberry.png" />
</asp:Content>
