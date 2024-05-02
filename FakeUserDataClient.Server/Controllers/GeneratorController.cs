using FakeUserDataClient.Server.Models;
using FakeUserDataClient.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace FakeUserDataClient.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GeneratorController : ControllerBase
{
    private readonly IDataGeneratorFactory _dataGeneratorCreator;
    public GeneratorController(IDataGeneratorFactory dataGeneratorCreator)
    {
        _dataGeneratorCreator = dataGeneratorCreator;
    }

    [HttpGet("params")]
    public IActionResult GetPeopleWithQueryParameters(int page, string region, int seed, int errors)
    {
        if (page < 1)
        {
            page = 1;
        }

        if (seed < 0)
        {
            seed = 0;
        }

        if (errors < 0)
        {
            errors = 0;
        }

        if (errors % Constants.StepErrorProbabilityInPercent != 0)
        {
            errors = (errors / 25) * 25;
        }

        if (!Constants.SupportedRegions.Contains(region))
        {
            region = "en_US";
        }

        Console.WriteLine("page number equals " + page);
        IDataGenerator dataGenerator = _dataGeneratorCreator.ConfigureGenerator(page, region, seed);
        var fakeRecords = dataGenerator.GetData(page, errors);
        return Ok(fakeRecords);
    }
}
