<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="upload.aspx.cs" Inherits="Es06_InfoStore.upload" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphNavBar" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphBody" runat="server">
    <asp:FileUpload ID="FileUpload1" runat="server" />
    <br />
    <asp:Button ID="btnUpload" class="btn btn-success btn-block" runat="server" Text="Upload" OnClick="btnUpload_Click" />
    <br />
    <asp:Button ID="btnAggiornaDB" class="btn btn-success btn-block" runat="server" Text="Aggiorna DB" OnClick="btnAggiornaDB_Click" />
    <br />
    <asp:Label ID="lblMessaggio" runat="server" Text=""></asp:Label>
</asp:Content>
