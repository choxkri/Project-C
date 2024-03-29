﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ProjectC.Migrations
{
    [DbContext(typeof(VisconContext))]
    [Migration("20240112210657_test")]
    partial class test
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Account", b =>
                {
                    b.Property<int>("AccountID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("AccountID");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("AccountID"));

                    b.Property<string>("AccountEmail")
                        .HasColumnType("text");

                    b.Property<string>("AccountName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AccountPassword")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AccountPhone")
                        .HasColumnType("text");

                    b.Property<int?>("CustCompanyID")
                        .HasColumnType("integer");

                    b.Property<int?>("DepartmentID")
                        .HasColumnType("integer");

                    b.Property<int>("TypeAccountID")
                        .HasColumnType("integer");

                    b.HasKey("AccountID");

                    b.HasIndex("CustCompanyID");

                    b.HasIndex("DepartmentID");

                    b.HasIndex("TypeAccountID");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("CustCompany", b =>
                {
                    b.Property<int>("CustCompanyID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CustCompanyID"));

                    b.Property<string>("CustCompanyName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("CustCompanyID");

                    b.ToTable("CustCompany");
                });

            modelBuilder.Entity("Department", b =>
                {
                    b.Property<int>("DepartmentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("DepartmentID"));

                    b.Property<string>("DepartmentName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("DepartmentID");

                    b.ToTable("Department");
                });

            modelBuilder.Entity("Machine", b =>
                {
                    b.Property<int>("MachineID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("MachineID"));

                    b.Property<int?>("CustCompanyID")
                        .HasColumnType("integer");

                    b.Property<string>("MachineName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("MachineID");

                    b.HasIndex("CustCompanyID");

                    b.ToTable("Machines");
                });

            modelBuilder.Entity("Ticket", b =>
                {
                    b.Property<int>("TicketID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("TicketID");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("TicketID"));

                    b.Property<int?>("CreatorID")
                        .HasColumnType("integer");

                    b.Property<string>("ExpectedResultExplanation")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("HowToFixExplanation")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("MachineID")
                        .HasColumnType("integer");

                    b.Property<int?>("SolverID")
                        .HasColumnType("integer");

                    b.Property<bool>("Status")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("TicketDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("TicketMessage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TicketName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TicketPhoto")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TriedExplanation")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("TicketID");

                    b.HasIndex("CreatorID");

                    b.HasIndex("MachineID");

                    b.HasIndex("SolverID");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("TypeAccount", b =>
                {
                    b.Property<int>("TypeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("TypeID"));

                    b.Property<string>("TypeName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("TypeID");

                    b.ToTable("TypeAccounts");
                });

            modelBuilder.Entity("Account", b =>
                {
                    b.HasOne("CustCompany", "CustCompany")
                        .WithMany()
                        .HasForeignKey("CustCompanyID");

                    b.HasOne("Department", "Department")
                        .WithMany()
                        .HasForeignKey("DepartmentID");

                    b.HasOne("TypeAccount", "TypeAccount")
                        .WithMany()
                        .HasForeignKey("TypeAccountID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CustCompany");

                    b.Navigation("Department");

                    b.Navigation("TypeAccount");
                });

            modelBuilder.Entity("Machine", b =>
                {
                    b.HasOne("CustCompany", null)
                        .WithMany("Machines")
                        .HasForeignKey("CustCompanyID");
                });

            modelBuilder.Entity("Ticket", b =>
                {
                    b.HasOne("Account", "Creator")
                        .WithMany("CustTicket")
                        .HasForeignKey("CreatorID");

                    b.HasOne("Machine", "Machine")
                        .WithMany()
                        .HasForeignKey("MachineID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Account", "Solver")
                        .WithMany("ViscTicket")
                        .HasForeignKey("SolverID");

                    b.Navigation("Creator");

                    b.Navigation("Machine");

                    b.Navigation("Solver");
                });

            modelBuilder.Entity("Account", b =>
                {
                    b.Navigation("CustTicket");

                    b.Navigation("ViscTicket");
                });

            modelBuilder.Entity("CustCompany", b =>
                {
                    b.Navigation("Machines");
                });
#pragma warning restore 612, 618
        }
    }
}
