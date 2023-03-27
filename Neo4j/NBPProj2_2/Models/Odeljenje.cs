namespace NBPProj2_2.Models
{
    public class Odeljenje
    {
        public int ID { get; set; }
        public string Tip { get; set; }
        public int Kapacitet { get; set; }
        public int BrojZauzetihMesta { get; set; }
        public string VremePosete { get; set; }
        public int Sprat { get; set; }
    }
}
