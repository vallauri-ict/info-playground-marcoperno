<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="visualizzaArticoli.aspx.cs" Inherits="Es06_InfoStore.visualizzaArticoli" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphNavBar" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphBody" runat="server">
    <asp:Label ID="lblFiltro" runat="server" Text="Filtra per"></asp:Label>
    <asp:DropDownList ID="cmbFiltro" CssClass="form-control" runat="server" OnSelectedIndexChanged="cmbFiltro_SelectedIndexChanged"></asp:DropDownList>
    <br />
    <asp:GridView ID="dgv" CssClass="table table-striped table-bordered" runat="server" AutoGenerateColumns="False" OnRowCommand="dgv_RowCommand" DataKeyNames="idProdotto">
        <Columns>
            <asp:BoundField DataField="idProdotto" HeaderText="id" Visible="false" />
            <asp:BoundField DataField="Marca" HeaderText="Marca" />
            <asp:BoundField DataField="Prezzo" HeaderText="Prezzo" />
            <asp:BoundField DataField="Nome" HeaderText="Nome" />
            <asp:BoundField DataField="Descrizione" HeaderText="Descrizione" />
            <asp:ImageField DataImageUrlField="Img" HeaderText="Immagine">
                <ControlStyle Height="50px" Width="33px" />
            </asp:ImageField>
            <asp:ButtonField ButtonType="Button" CommandName="acquista" Text="Acquista" HeaderText="Aquista" ControlStyle-CssClass="btn btn-warning">
                <ControlStyle CssClass="btn btn-warning"></ControlStyle>
            </asp:ButtonField>
        </Columns>
    </asp:GridView>
    <br />
    <asp:Panel ID="divMsg" class="alert alert-warning" runat="server">
        <strong>ATTENZIONE!</strong> Nessun prodotto presente.
    </asp:Panel>
</asp:Content>

