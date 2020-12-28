namespace Socket02_SRV
{
    partial class Form1
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
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.lblStatoServer = new System.Windows.Forms.Label();
            this.btnArresta = new System.Windows.Forms.Button();
            this.btnAvvia = new System.Windows.Forms.Button();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.cmbPortaServer = new System.Windows.Forms.ComboBox();
            this.lstIPServer = new System.Windows.Forms.ListBox();
            this.label1 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.btnPulisci = new System.Windows.Forms.Button();
            this.lstLogServer = new System.Windows.Forms.ListBox();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.BackColor = System.Drawing.SystemColors.ControlDark;
            this.groupBox1.Controls.Add(this.lblStatoServer);
            this.groupBox1.Controls.Add(this.btnArresta);
            this.groupBox1.Controls.Add(this.btnAvvia);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.cmbPortaServer);
            this.groupBox1.Controls.Add(this.lstIPServer);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Location = new System.Drawing.Point(12, 12);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(621, 163);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Parametri attivazione server";
            // 
            // lblStatoServer
            // 
            this.lblStatoServer.AutoSize = true;
            this.lblStatoServer.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblStatoServer.Location = new System.Drawing.Point(168, 112);
            this.lblStatoServer.Name = "lblStatoServer";
            this.lblStatoServer.Size = new System.Drawing.Size(0, 13);
            this.lblStatoServer.TabIndex = 7;
            // 
            // btnArresta
            // 
            this.btnArresta.Location = new System.Drawing.Point(365, 85);
            this.btnArresta.Name = "btnArresta";
            this.btnArresta.Size = new System.Drawing.Size(75, 23);
            this.btnArresta.TabIndex = 6;
            this.btnArresta.Text = "arresta";
            this.btnArresta.UseVisualStyleBackColor = true;
            this.btnArresta.Click += new System.EventHandler(this.btnArresta_Click);
            // 
            // btnAvvia
            // 
            this.btnAvvia.Location = new System.Drawing.Point(365, 43);
            this.btnAvvia.Name = "btnAvvia";
            this.btnAvvia.Size = new System.Drawing.Size(75, 23);
            this.btnAvvia.TabIndex = 5;
            this.btnAvvia.Text = "avvia";
            this.btnAvvia.UseVisualStyleBackColor = true;
            this.btnAvvia.Click += new System.EventHandler(this.btnAvvia_Click);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(165, 95);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(66, 13);
            this.label3.TabIndex = 4;
            this.label3.Text = "Stato Server";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(165, 27);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(32, 13);
            this.label2.TabIndex = 3;
            this.label2.Text = "Porta";
            // 
            // cmbPortaServer
            // 
            this.cmbPortaServer.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbPortaServer.FormattingEnabled = true;
            this.cmbPortaServer.Items.AddRange(new object[] {
            "8080",
            "8888",
            "9090",
            "9999"});
            this.cmbPortaServer.Location = new System.Drawing.Point(168, 43);
            this.cmbPortaServer.Name = "cmbPortaServer";
            this.cmbPortaServer.Size = new System.Drawing.Size(121, 21);
            this.cmbPortaServer.TabIndex = 2;
            // 
            // lstIPServer
            // 
            this.lstIPServer.FormattingEnabled = true;
            this.lstIPServer.Location = new System.Drawing.Point(6, 43);
            this.lstIPServer.Name = "lstIPServer";
            this.lstIPServer.Size = new System.Drawing.Size(120, 95);
            this.lstIPServer.TabIndex = 1;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(6, 27);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(17, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "IP";
            // 
            // groupBox2
            // 
            this.groupBox2.BackColor = System.Drawing.SystemColors.ControlDark;
            this.groupBox2.Controls.Add(this.btnPulisci);
            this.groupBox2.Controls.Add(this.lstLogServer);
            this.groupBox2.Location = new System.Drawing.Point(12, 181);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(621, 216);
            this.groupBox2.TabIndex = 1;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "LogOperazioniServer";
            // 
            // btnPulisci
            // 
            this.btnPulisci.Location = new System.Drawing.Point(523, 16);
            this.btnPulisci.Name = "btnPulisci";
            this.btnPulisci.Size = new System.Drawing.Size(75, 23);
            this.btnPulisci.TabIndex = 1;
            this.btnPulisci.Text = "pulisci";
            this.btnPulisci.UseVisualStyleBackColor = true;
            // 
            // lstLogServer
            // 
            this.lstLogServer.FormattingEnabled = true;
            this.lstLogServer.Location = new System.Drawing.Point(9, 45);
            this.lstLogServer.Name = "lstLogServer";
            this.lstLogServer.Size = new System.Drawing.Size(606, 160);
            this.lstLogServer.TabIndex = 0;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(667, 409);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Name = "Form1";
            this.Text = "FTP_Server";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form1_FormClosing);
            this.Load += new System.EventHandler(this.Form1_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label lblStatoServer;
        private System.Windows.Forms.Button btnArresta;
        private System.Windows.Forms.Button btnAvvia;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ComboBox cmbPortaServer;
        private System.Windows.Forms.ListBox lstIPServer;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Button btnPulisci;
        private System.Windows.Forms.ListBox lstLogServer;
    }
}

