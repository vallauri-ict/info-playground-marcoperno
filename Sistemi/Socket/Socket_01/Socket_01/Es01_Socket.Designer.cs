namespace Socket_01
{
    partial class Es01_Socket
    {
        /// <summary>
        /// Variabile di progettazione necessaria.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Pulire le risorse in uso.
        /// </summary>
        /// <param name="disposing">ha valore true se le risorse gestite devono essere eliminate, false in caso contrario.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Codice generato da Progettazione Windows Form

        /// <summary>
        /// Metodo necessario per il supporto della finestra di progettazione. Non modificare
        /// il contenuto del metodo con l'editor di codice.
        /// </summary>
        private void InitializeComponent()
        {
            this.grpServer = new System.Windows.Forms.GroupBox();
            this.lblStatoServer = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.txtMessaggioRicevuto = new System.Windows.Forms.TextBox();
            this.btnArrestaServer = new System.Windows.Forms.Button();
            this.btnAvviaServer = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.cmbPortaServer = new System.Windows.Forms.ComboBox();
            this.LstIP = new System.Windows.Forms.ListBox();
            this.label1 = new System.Windows.Forms.Label();
            this.grpClient = new System.Windows.Forms.GroupBox();
            this.cmbPortaHostRemoto = new System.Windows.Forms.ComboBox();
            this.txtIPHostRemoto = new System.Windows.Forms.TextBox();
            this.txtMessaggioDaInviare = new System.Windows.Forms.TextBox();
            this.btnInvia = new System.Windows.Forms.Button();
            this.label6 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.grpServer.SuspendLayout();
            this.grpClient.SuspendLayout();
            this.SuspendLayout();
            // 
            // grpServer
            // 
            this.grpServer.BackColor = System.Drawing.SystemColors.ControlDark;
            this.grpServer.Controls.Add(this.lblStatoServer);
            this.grpServer.Controls.Add(this.label3);
            this.grpServer.Controls.Add(this.txtMessaggioRicevuto);
            this.grpServer.Controls.Add(this.btnArrestaServer);
            this.grpServer.Controls.Add(this.btnAvviaServer);
            this.grpServer.Controls.Add(this.label2);
            this.grpServer.Controls.Add(this.cmbPortaServer);
            this.grpServer.Controls.Add(this.LstIP);
            this.grpServer.Controls.Add(this.label1);
            this.grpServer.Location = new System.Drawing.Point(73, 27);
            this.grpServer.Name = "grpServer";
            this.grpServer.Size = new System.Drawing.Size(400, 219);
            this.grpServer.TabIndex = 0;
            this.grpServer.TabStop = false;
            this.grpServer.Text = "Lato SERVER";
            // 
            // lblStatoServer
            // 
            this.lblStatoServer.AutoSize = true;
            this.lblStatoServer.Location = new System.Drawing.Point(250, 127);
            this.lblStatoServer.Name = "lblStatoServer";
            this.lblStatoServer.Size = new System.Drawing.Size(27, 13);
            this.lblStatoServer.TabIndex = 8;
            this.lblStatoServer.Text = "stop";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(176, 147);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(107, 13);
            this.label3.TabIndex = 7;
            this.label3.Text = "Messaggio Ricevuto:";
            // 
            // txtMessaggioRicevuto
            // 
            this.txtMessaggioRicevuto.Enabled = false;
            this.txtMessaggioRicevuto.Location = new System.Drawing.Point(179, 176);
            this.txtMessaggioRicevuto.Name = "txtMessaggioRicevuto";
            this.txtMessaggioRicevuto.Size = new System.Drawing.Size(195, 20);
            this.txtMessaggioRicevuto.TabIndex = 6;
            // 
            // btnArrestaServer
            // 
            this.btnArrestaServer.Enabled = false;
            this.btnArrestaServer.Location = new System.Drawing.Point(289, 92);
            this.btnArrestaServer.Name = "btnArrestaServer";
            this.btnArrestaServer.Size = new System.Drawing.Size(85, 32);
            this.btnArrestaServer.TabIndex = 5;
            this.btnArrestaServer.Text = "Arresta Server";
            this.btnArrestaServer.UseVisualStyleBackColor = true;
            this.btnArrestaServer.Click += new System.EventHandler(this.BtnArrestaServer_Click);
            // 
            // btnAvviaServer
            // 
            this.btnAvviaServer.Enabled = false;
            this.btnAvviaServer.Location = new System.Drawing.Point(179, 92);
            this.btnAvviaServer.Name = "btnAvviaServer";
            this.btnAvviaServer.Size = new System.Drawing.Size(86, 32);
            this.btnAvviaServer.TabIndex = 4;
            this.btnAvviaServer.Text = "Avvia Server";
            this.btnAvviaServer.UseVisualStyleBackColor = true;
            this.btnAvviaServer.Click += new System.EventHandler(this.BtnAvviaServer_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(176, 29);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(81, 13);
            this.label2.TabIndex = 3;
            this.label2.Text = "Porta in Ascolto";
            // 
            // cmbPortaServer
            // 
            this.cmbPortaServer.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbPortaServer.FormattingEnabled = true;
            this.cmbPortaServer.Items.AddRange(new object[] {
            "8080",
            "8888",
            "9999",
            "9090"});
            this.cmbPortaServer.Location = new System.Drawing.Point(253, 26);
            this.cmbPortaServer.Name = "cmbPortaServer";
            this.cmbPortaServer.Size = new System.Drawing.Size(121, 21);
            this.cmbPortaServer.TabIndex = 2;
            this.cmbPortaServer.SelectedIndexChanged += new System.EventHandler(this.CmbPortaServer_SelectedIndexChanged);
            // 
            // LstIP
            // 
            this.LstIP.FormattingEnabled = true;
            this.LstIP.Location = new System.Drawing.Point(9, 52);
            this.LstIP.Name = "LstIP";
            this.LstIP.Size = new System.Drawing.Size(131, 95);
            this.LstIP.TabIndex = 1;
            this.LstIP.SelectedIndexChanged += new System.EventHandler(this.LstIP_SelectedIndexChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(6, 26);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(66, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "IP in Ascolto";
            // 
            // grpClient
            // 
            this.grpClient.BackColor = System.Drawing.SystemColors.ControlDark;
            this.grpClient.Controls.Add(this.cmbPortaHostRemoto);
            this.grpClient.Controls.Add(this.txtIPHostRemoto);
            this.grpClient.Controls.Add(this.txtMessaggioDaInviare);
            this.grpClient.Controls.Add(this.btnInvia);
            this.grpClient.Controls.Add(this.label6);
            this.grpClient.Controls.Add(this.label5);
            this.grpClient.Controls.Add(this.label4);
            this.grpClient.Location = new System.Drawing.Point(73, 290);
            this.grpClient.Name = "grpClient";
            this.grpClient.Size = new System.Drawing.Size(400, 254);
            this.grpClient.TabIndex = 0;
            this.grpClient.TabStop = false;
            this.grpClient.Text = "Lato CLIENT";
            // 
            // cmbPortaHostRemoto
            // 
            this.cmbPortaHostRemoto.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbPortaHostRemoto.FormattingEnabled = true;
            this.cmbPortaHostRemoto.Items.AddRange(new object[] {
            "8080",
            "8888",
            "9999",
            "9090"});
            this.cmbPortaHostRemoto.Location = new System.Drawing.Point(117, 60);
            this.cmbPortaHostRemoto.Name = "cmbPortaHostRemoto";
            this.cmbPortaHostRemoto.Size = new System.Drawing.Size(121, 21);
            this.cmbPortaHostRemoto.TabIndex = 12;
            // 
            // txtIPHostRemoto
            // 
            this.txtIPHostRemoto.Location = new System.Drawing.Point(117, 24);
            this.txtIPHostRemoto.Name = "txtIPHostRemoto";
            this.txtIPHostRemoto.Size = new System.Drawing.Size(92, 20);
            this.txtIPHostRemoto.TabIndex = 11;
            // 
            // txtMessaggioDaInviare
            // 
            this.txtMessaggioDaInviare.Location = new System.Drawing.Point(117, 113);
            this.txtMessaggioDaInviare.Name = "txtMessaggioDaInviare";
            this.txtMessaggioDaInviare.Size = new System.Drawing.Size(221, 20);
            this.txtMessaggioDaInviare.TabIndex = 10;
            // 
            // btnInvia
            // 
            this.btnInvia.Location = new System.Drawing.Point(134, 166);
            this.btnInvia.Name = "btnInvia";
            this.btnInvia.Size = new System.Drawing.Size(75, 23);
            this.btnInvia.TabIndex = 9;
            this.btnInvia.Text = "INVIA";
            this.btnInvia.UseVisualStyleBackColor = true;
            this.btnInvia.Click += new System.EventHandler(this.BtnInvia_Click);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(6, 116);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(111, 13);
            this.label6.TabIndex = 8;
            this.label6.Text = "Messaggio da Inviare:";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(6, 68);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(97, 13);
            this.label5.TabIndex = 1;
            this.label5.Text = "Porta Host Remoto";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(6, 27);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(69, 13);
            this.label4.TabIndex = 0;
            this.label4.Text = "Host Remoto";
            // 
            // Es01_Socket
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(821, 567);
            this.Controls.Add(this.grpClient);
            this.Controls.Add(this.grpServer);
            this.Name = "Es01_Socket";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Es01_Socket_Load);
            this.grpServer.ResumeLayout(false);
            this.grpServer.PerformLayout();
            this.grpClient.ResumeLayout(false);
            this.grpClient.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox grpServer;
        private System.Windows.Forms.GroupBox grpClient;
        private System.Windows.Forms.ListBox LstIP;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button btnArrestaServer;
        private System.Windows.Forms.Button btnAvviaServer;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ComboBox cmbPortaServer;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtMessaggioRicevuto;
        private System.Windows.Forms.ComboBox cmbPortaHostRemoto;
        private System.Windows.Forms.TextBox txtIPHostRemoto;
        private System.Windows.Forms.TextBox txtMessaggioDaInviare;
        private System.Windows.Forms.Button btnInvia;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label lblStatoServer;
    }
}

